import { useParams } from 'react-router-dom';
import UserProfile from '../components/users/UserProfile';
import useAuthContext from '../hooks/useAuthContext';
import LoginAlert from '../components/common/LoginAlert';
const Profile = () => {
    const { userId } = useParams();
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? <UserProfile userId={userId} /> : <LoginAlert />;
};

export default Profile;
