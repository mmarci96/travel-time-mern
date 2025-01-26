import { useParams } from 'react-router-dom';
import UserProfile from '../components/users/UserProfile';
const Profile = () => {
    const { userId } = useParams();

    return (
        <UserProfile
            userId={userId}
        />
    )
}  

export default Profile
