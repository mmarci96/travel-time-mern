import { useEffect, useState } from 'react';
import useAuthRequest from '../hooks/useAuthRequest';
import NotificationCard from '../components/notifications/NotificationCard';
import LoadAnimation from '../components/common/LoadAnimation';
import useAuthContext from '../hooks/useAuthContext';
import LoginAlert from '../components/common/LoginAlert';
import AnimatedComponent from '../components/common/AnimatedComponent';
import useNotificationContext from '../hooks/useNotificationContext';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { isAuthenticated } = useAuthContext();
    const { error, loading, sendRequest } = useAuthRequest();
    const { updateNotificationCounter } = useNotificationContext();

    const handleMarkRead = async (notificationId) => {
        const data = { notificationId };
        const updatedNotification = await sendRequest(
            '/api/notifications',
            'PATCH',
            data,
        );
        if (updatedNotification) {
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, read: true }
                        : notification,
                ),
            );
            updateNotificationCounter((prevCount) => prevCount - 1);
        }
    };

    useEffect(() => {
        sendRequest('/api/notifications', 'GET')
            .then((data) =>
                data.notifications
                    ? setNotifications(data.notifications)
                    : setNotifications([]),
            )
            .catch((e) => console.error(e));
    }, []);

    return isAuthenticated ? (
        <div className="w-screen flex flex-col items-center p-4 bg-gray-100 ">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {loading && <LoadAnimation />}
            {error && (
                <p className="text-red-500 text-center">
                    Error: {error.message}
                </p>
            )}
            {notifications && notifications.length > 0 ? (
                <AnimatedComponent
                    children={
                        <ul className="w-full">
                            {notifications.map((notification) => (
                                <li key={notification.id} className="mb-4">
                                    <NotificationCard
                                        notification={notification}
                                        onMarkAsRead={handleMarkRead}
                                    />
                                </li>
                            ))}
                        </ul>
                    }
                />
            ) : (
                !loading && (
                    <p className="text-center text-gray-500">
                        No notifications to display.
                    </p>
                )
            )}
        </div>
    ) : (
        <LoginAlert />
    );
};

export default Notifications;
