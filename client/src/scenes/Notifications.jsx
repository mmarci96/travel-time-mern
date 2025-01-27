import { useEffect, useState } from "react";
import useAuthRequest from "../hooks/useAuthRequest";
import NotificationCard from "../components/notifications/NotificationCard";
import LoadAnimation from "../components/common/LoadAnimation";

const Notifications = () => {
    const [ notifications, setNotifications ] = useState([]);
    const { error, loading, sendRequest } = useAuthRequest();
    useEffect(() => {
        sendRequest('/api/notifications', 'GET')
            .then(data => data.notifications ? 
                setNotifications(data.notifications) : 
                setNotifications([]))
            .catch(e => console.error(e))
    },[])

    useEffect(() => {
        console.log(notifications)
    },[notifications])


    return (
        <div>
        {loading && <LoadAnimation />}
        {error && (
            <p className="text-red-500 text-center">
                Error: {error.message}
            </p>
        )}
            {notifications && notifications.length > 0 &&
                <ul>
                    {notifications.map(notification => (
                    <li key={notification._id} >
                           <NotificationCard notification={notification} /> 
                    </li>
                    ))}
                </ul>
            }
        </div>);
};

export default Notifications;
