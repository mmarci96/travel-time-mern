import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu.jsx';
import { useContext } from 'react';
import Button from '../common/Button.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const TopNavBar = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    return (
        <div className="bg-blue-200 w-full h-12 flex z-10 top-0">
            <img src="/travel-logo.png" className="h-10 mx-2 my-auto" alt="logo" />
            <h1 className="text-white bg-cyan-600 bg-opacity-80 p-1 pt-2 px-4 text-xl ml-2 m-auto tracking-wide rounded-2xl font-semibold">
                <Link to="/feed">TravelTime</Link>
            </h1>
            {isAuthenticated && <ProfileMenu />}
        </div>
    );
};

export default TopNavBar;
