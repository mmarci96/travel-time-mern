import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu.jsx';
import { useContext } from 'react';
import Button from '../common/Button.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const TopNavBar = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    return (
        <div className="bg-blue-200 w-full h-16 flex z-10 sticky top-0">
            <img src="/travel-logo.png" className="h-12 m-2" alt="logo" />
            <h1 className="text-white bg-cyan-600 bg-opacity-80 pb-1 pt-2 px-4 text-2xl ml-2 m-auto tracking-wide rounded-2xl font-semibold">
                <Link to="/feed">TravelTime</Link>
            </h1>
            {isAuthenticated ? (
                <ProfileMenu />
            ) : (
                <Link to="/">
                    <Button>Log in</Button>
                </Link>
            )}
        </div>
    );
};

export default TopNavBar;
