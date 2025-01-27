const NotificationCard = ({ notification }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case "LIKE":
                return "❤️";
            case "FOLLOW":
                return "🔔";
            case "COMMENT":
                return "💬";
            default:
                return "📢";
        }
    };

    return (
        <div className="flex items-center w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <div className="flex-shrink-0 text-xl mr-4">
                {getTypeIcon(notification.type)}
            </div>
            <div className="flex-grow">
                <p className="text-gray-800 font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                    {notification.actorUsername ? `From: ${notification.actorUsername}` : "Unknown"}
                </p>
            </div>
            <div className="ml-auto">
                <a
                    href={`/notification/${notification.id}`}
                    className="text-cyan-600 hover:underline text-sm"
                >
                    View Details
                </a>
            </div>
        </div>
    );
};

export default NotificationCard;

