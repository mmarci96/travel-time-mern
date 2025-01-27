import UserProfile from '../components/users/UserProfile.jsx';
import { FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MyAccount = () => {
    return (
        <div>
            <div>MyAccount</div>
            <UserProfile />
            <Link to="/updateprofile" className="flex items-center m-auto">
            <FaPencilAlt size={30} />
                </Link>
        </div>
    );
};

export default MyAccount;
