import UserProfile from '../components/users/UserProfile.jsx';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import UserForm from '../components/users/UserUpdate.jsx';
import useAuthContext from '../hooks/useAuthContext.js';
import LoginAlert from '../components/common/LoginAlert.jsx';

const MyAccount = () => {
    const [change, setChange] = useState(true);
    const { currentUserId, isAuthenticated } = useAuthContext();

    return isAuthenticated ? (
        <div>
            {change ? (
                <div>
                    {currentUserId && <UserProfile userId={currentUserId} />}
                    <FaPencilAlt size={30} onClick={() => setChange(false)} />
                </div>
            ) : (
                <div>
                    <UserForm />
                </div>
            )}
        </div>
    ) : (
        <LoginAlert />
    );
};

export default MyAccount;
