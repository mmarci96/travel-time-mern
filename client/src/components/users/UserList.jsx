import { useState, useEffect } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest';
import UserInfoCard from './UserInfoCard';
import LoadAnimation from '../common/LoadAnimation';
import AnimatedComponent from '../common/AnimatedComponent';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const { sendRequest, loading, error } = useAuthRequest();

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await sendRequest(
                `/api/users/discover?limit=10&page=${page}`,
                'GET',
            );
            if (data) {
                setUsers(data.users);
            } else {
                setUsers([]);
            }
        };

        fetchUsers();
    }, [page]);

    return (
        <div className="p-4">
            {loading && <LoadAnimation />}
            {error && (
                <p className="text-red-500 text-center">
                    Error: {error.message}
                </p>
            )}

            {!loading && !error && users.length > 0 && (
                <AnimatedComponent
                    children={
                        <ul className="flex flex-wrap justify-around gap-4">
                            {users.map((userInfo) => (
                                <li key={userInfo.id}>
                                    <UserInfoCard userInfo={userInfo} />
                                </li>
                            ))}
                        </ul>
                    }
                />
            )}

            {!loading && !error && users.length === 0 && (
                <p className="text-gray-600 text-center">No users found.</p>
            )}

            {!loading && !error && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() =>
                            setPage((prevPage) => Math.max(prevPage - 1, 1))
                        }
                        className="bg-cyan-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((prevPage) => prevPage + 1)}
                        className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserList;
