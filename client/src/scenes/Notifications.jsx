
import { useEffect, useState } from "react";
import useAuthRequest from "../hooks/useAuthRequest";
import NotificationCard from "../components/notifications/NotificationCard";
import LoadAnimation from "../components/common/LoadAnimation";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { error, loading, sendRequest } = useAuthRequest();

    useEffect(() => {
        sendRequest('/api/notifications', 'GET')
            .then((data) =>
                data.notifications ? setNotifications(data.notifications) : setNotifications([])
            )
            .catch((e) => console.error(e));
    }, []);

    return (
        <div className="w-full flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {loading && <LoadAnimation />}
            {error && (
                <p className="text-red-500 text-center">
                    Error: {error.message}
                </p>
            )}
            {notifications && notifications.length > 0 ? (
                <ul className="w-full max-w-4xl">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="mb-4">
                            <NotificationCard notification={notification} />
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && (
                    <p className="text-center text-gray-500">
                        No notifications to display.
                    </p>
                )
            )}
        </div>
    );
};

export default Notifications;

