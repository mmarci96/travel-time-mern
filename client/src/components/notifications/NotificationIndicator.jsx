import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest';

const NotificationIndicator = () => {
    const [notificationCounter, setNotificationCounter] = useState(0);
    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        sendRequest('/api/notifications/unread', 'GET')
            .then((data) =>
                data.notifications
                    ? setNotificationCounter(data.notifications)
                    : setNotificationCounter(0),
            )
            .catch((e) => console.error(e));
    }, []);

    return (
        notificationCounter > 0 && (
            <div className="rounded-full bg-red-500 text-white p-2 font-bold w-8 h-8 flex items-center justify-center">
                {notificationCounter}
            </div>
        )
    );
};

export default NotificationIndicator;
