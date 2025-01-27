import { Link } from 'react-router-dom';

const NotificationCard = ({ notification, onMarkAsRead }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case 'LIKE':
                return '❤️';
            case 'FOLLOW':
                return '🔔';
            case 'COMMENT':
                return '💬';
            default:
                return '📢';
        }
    };
    const handleMarkAsRead = () => onMarkAsRead(notification.id);

    return (
        <div
            className={`flex justify-between w-full shadow-md rounded-lg border ${
                notification.read ? 'bg-gray-200' : 'bg-white'
            } border-gray-200`}
        >
            <div className="flex text-xl mr-2">
                {getTypeIcon(notification.type)}
            </div>

            <div className="flex flex-col">
                <p className="text-gray-800 font-medium">
                    {notification.message}
                </p>

                <p className="text-sm text-gray-500 flex justify-between">
                    {notification.actorUsername
                        ? `From: ${notification.actorUsername}\t, on: `
                        : 'Unknown\t'}

                    {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(notification.createdAt))}
                </p>
            </div>

            <div className="flex flex-col ml-auto mr-2 w-[180px]">
                {notification.type === 'FOLLOW' ? (
                    <button className=" w-[120px] h-[32px] m-2 text-sm text-white bg-cyan-500 hover:bg-cyan-600 transition duration-300 ease-in-out px-3 py-1 rounded-md ml-auto">
                        <Link to={`/profile/${notification.actorId}`}>
                            Go to {notification.actorUsername}&apos;s profile
                        </Link>
                    </button>
                ) : (
                    <button className="m-2 w-[120px] h-[32px]  text-sm text-white bg-cyan-500 hover:bg-cyan-600 transition duration-300 ease-in-out px-3 py-1 rounded-md ml-auto">
                        <Link to={`/post/${notification.targetId}`}>
                            See the Post!
                        </Link>
                    </button>
                )}
                {!notification.read && (
                    <button
                        onClick={handleMarkAsRead}
                        className="text-sm m-2 w-[120px] h-[32px]  text-white bg-cyan-500 hover:bg-cyan-600 transition duration-300 ease-in-out px-3 py-1 rounded-md ml-auto"
                    >
                        Mark as Read
                    </button>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;
