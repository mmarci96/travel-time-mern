const NotificationCard = ({ notification }) => {
    return (
    <div>
        <h2>
            {notification?.message}
        </h2>
    </div>
    )
}

export default NotificationCard;
