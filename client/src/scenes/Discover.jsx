import UserList from '../components/users/UserList';

const Discover = () => {
    return (
        <div className="flex flex-col item-center">
            <h2 className="text-xl font-semibold mx-auto my-2">
                Discover other travellers:
            </h2>
            <UserList />
        </div>
    );
};

export default Discover;
