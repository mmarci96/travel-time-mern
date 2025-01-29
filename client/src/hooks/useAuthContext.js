import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const useAuthContext = () => {
    return useContext(AuthContext);
};

export default useAuthContext;
