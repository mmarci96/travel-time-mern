import { Link } from 'react-router-dom';
import Button from '../common/Button';

const UserInfoCard = ({ userInfo }) => {
    return (
        <div className="flex items-center bg-white shadow-lg rounded-2xl p-2 m-2 w-[44vw] h-[16vh] min-h-[120px] min-w-[360px] hover:shadow-xl transition-shadow">
            <img
                src={userInfo.avatar_url}
                alt={`${userInfo.first_name} ${userInfo.last_name}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                    {userInfo.first_name} {userInfo.last_name}
                </h3>
                <p className="text-sm text-gray-500">@{userInfo.username}</p>
                <p className="text-sm text-gray-600 mt-1">
                    {userInfo.location}
                </p>
            </div>
            <Button
                children={<Link to={`/profile/${userInfo.id}`}>Profile</Link>}
                color="cyan"
            />
        </div>
    );
};

export default UserInfoCard;
