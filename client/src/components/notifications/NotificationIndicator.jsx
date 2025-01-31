import { useEffect } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest';
import useNotificationContext from '../../hooks/useNotificationContext';
import useAuthContext from '../../hooks/useAuthContext';

const NotificationIndicator = () => {
    const { notificationCounter, updateNotificationCounter } = useNotificationContext()
    const { sendRequest } = useAuthRequest();
    const { currentUserId } = useAuthContext()

    useEffect(() => {
        const fetchNotificationCount = async () => {
            const data = await sendRequest('/api/notifications/unread', 'GET')
            if (!data) {
                updateNotificationCounter(0)
                return
            }
            if (data.notifications) {
                updateNotificationCounter(data.notifications)
            }
        }

        fetchNotificationCount()
    }, [currentUserId]);

    return (
        notificationCounter > 0 && (
            <div className="rounded-full bg-red-500 text-white p-2 font-bold w-6 h-6 flex items-center justify-center absolute top-1 ml-6 mr-auto">
                {notificationCounter}
            </div>
        )
    );
};

export default NotificationIndicator;
