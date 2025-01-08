import { Link } from 'react-router-dom';

const TopNavBar = () => {
    return (
        <div className="bg-blue-200 w-full h-16 flex z-10 sticky">
            <img src="/travel-logo.png" className="h-12 m-2" alt="logo" />
            <h1 className="text-white bg-cyan-600 bg-opacity-80 pb-1 pt-2 px-4 text-2xl ml-2 m-auto tracking-wide rounded-2xl font-semibold">
                <Link to="/feed">TravelTime</Link>
            </h1>
        </div>
    );
};

export default TopNavBar;
