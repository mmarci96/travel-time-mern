import { Link } from 'react-router-dom';
import { FaPlusSquare, FaSearch, FaUser, FaHome, FaBell } from 'react-icons/fa';
import NotificationIndicator from '../notifications/NotificationIndicator';

const BotNavBar = () => {
    return (
        <nav className="bg-white fixed bottom-0 w-full h-[72px]  flex justify-center border-t-8 border-secondary">
            <div className="h-16 flex  bg-white w-[80vw] ml-auto mr-auto ">
                <Link to="/feed" className="flex items-center m-auto">
                    <NavBarIcon icon={<FaHome size={30} />} text="Home" />
                </Link>

                <Link to="/discover" className="flex items-center m-auto">
                    <NavBarIcon icon={<FaSearch size={30} />} text="Search" />
                </Link>

                <Link to="/create" className="flex items-center m-auto">
                    <NavBarIcon icon={<FaPlusSquare size={30} />} text="Post" />
                </Link>

                <Link to="/notifications" className="flex items-center m-auto">
                    <NavBarIcon
                        icon={<FaBell size={30} />}
                        text="Notifications"
                    />
                    <NotificationIndicator />
                </Link>

                <Link to="/my-account" className="flex items-center m-auto">
                    <NavBarIcon icon={<FaUser size={30} />} text="Profile" />
                </Link>
            </div>
        </nav>
    );
};

const NavBarIcon = ({ icon, text = 'tooltip 💡' }) => (
    <div className="navbar-icon group">
        {icon}
        <span className="navbar-tooltip group-hover:scale-100">{text}</span>
    </div>
);

export default BotNavBar;
