import LoginAlert from '../components/common/LoginAlert';
import UserList from '../components/users/UserList';
import useAuthContext from '../hooks/useAuthContext';

const Discover = () => {
    const { isAuthenticated } = useAuthContext()
    return (
        <div className="flex flex-col item-center">
            {isAuthenticated ? <>
                <h2 className="text-xl font-semibold mx-auto my-2">
                    Discover other travellers:
                </h2>
                <UserList /></>: < LoginAlert/>}
        </div>
    );
};

export default Discover;
