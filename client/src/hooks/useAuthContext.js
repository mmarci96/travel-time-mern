import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import useAuthRequest from './useAuthRequest.js';

const useAuthContext = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const { user } = useContext(AuthContext);
    const { sendRequest } = useAuthRequest();
    useEffect(() => {
        const getUserId = async () => {
            const data = await sendRequest('/api/users/my-id', 'GET');
            setCurrentUserId(data.userId);
        };
        !currentUserId && getUserId();
    }, [user]);

    return { token: user, currentUserId };
};

export default useAuthContext;
