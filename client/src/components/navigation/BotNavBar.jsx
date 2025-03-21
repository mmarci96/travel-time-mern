import { Link } from 'react-router-dom';
import { FaPlusSquare, FaSearch, FaUser, FaHome, FaBell } from 'react-icons/fa';
import NotificationIndicator from '../notifications/NotificationIndicator';
import useAuthContext from '../../hooks/useAuthContext';

const BotNavBar = () => {
    const { isAuthenticated } = useAuthContext();
    return (
        isAuthenticated && (
            <nav className="bg-white fixed bottom-0 w-full h-[64px]  flex justify-center border-t-8 border-secondary">
                <div className="h-12 flex  bg-white w-[80vw] ml-auto mr-auto ">
                    <Link to="/feed" className="flex items-center m-auto">
                        <NavBarIcon icon={<FaHome size={24} />} text="Home" />
                    </Link>

                    <Link to="/discover" className="flex items-center m-auto">
                        <NavBarIcon
                            icon={<FaSearch size={24} />}
                            text="Search"
                        />
                    </Link>

                    <Link to="/create" className="flex items-center m-auto">
                        <NavBarIcon
                            icon={<FaPlusSquare size={24} />}
                            text="Post"
                        />
                    </Link>

                    <Link
                        to="/notifications"
                        className="flex items-center m-auto"
                    >
                        <NavBarIcon
                            icon={<FaBell size={24} />}
                            text="Notifications"
                        />
                        <NotificationIndicator />
                    </Link>

                    <Link to="/my-account" className="flex items-center m-auto">
                        <NavBarIcon
                            icon={<FaUser size={24} />}
                            text="My Account"
                        />
                    </Link>
                </div>
            </nav>
        )
    );
};

const NavBarIcon = ({ icon, text = 'tooltip 💡' }) => (
    <div className="navbar-icon group">
        {icon}
        <span className="navbar-tooltip group-hover:scale-100">{text}</span>
    </div>
);

export default BotNavBar;
