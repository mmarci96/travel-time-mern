import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './scenes/Home';
import PageNotFound from './scenes/PageNotFound';
import Feed from './scenes/Feed';
import TesterScene from './scenes/TesterScene.jsx';
import Post from './scenes/Post.jsx';
import TopNavBar from './components/navigation/TopNavBar.jsx';
import BotNavBar from './components/navigation/BotNavBar.jsx';
import Create from './scenes/Create.jsx';
import MyAccount from './scenes/MyAccount.jsx';
import Notifications from './scenes/Notifications.jsx';
import Discover from './scenes/Discover.jsx';

function App() {
    return (
        <BrowserRouter>
            <TopNavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/create" element={<Create />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/discover" element={<Discover />} />

                <Route path="/post/:postId" element={<Post />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/test" element={<TesterScene />} />
            </Routes>
            <BotNavBar />
        </BrowserRouter>
    );
}

export default App;
