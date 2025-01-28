import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import TopNavBar from './components/navigation/TopNavBar.jsx';
import BotNavBar from './components/navigation/BotNavBar.jsx';
import LoadAnimation from './components/common/LoadAnimation.jsx';
import UserRegistration from './components/users/UserRegistration.jsx';

const Home = lazy(() => import('./scenes/Home'));
const PageNotFound = lazy(() => import('./scenes/PageNotFound'));
const Feed = lazy(() => import('./scenes/Feed'));
const TesterScene = lazy(() => import('./scenes/TesterScene.jsx'));
const Post = lazy(() => import('./scenes/Post.jsx'));
const Create = lazy(() => import('./scenes/Create.jsx'));
const MyAccount = lazy(() => import('./scenes/MyAccount.jsx'));
const Notifications = lazy(() => import('./scenes/Notifications.jsx'));
const Discover = lazy(() => import('./scenes/Discover.jsx'));
const Profile = lazy(() => import('./scenes/Profile.jsx'));

function App() {
    return (
        <BrowserRouter>
            <TopNavBar />
            <Suspense fallback={<LoadAnimation />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="/post/:postId" element={<Post />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/test" element={<TesterScene />} />
                    <Route path="/userdetails" element={<UserRegistration />} />
                </Routes>
            </Suspense>
            <BotNavBar />
        </BrowserRouter>
    );
}

export default App;
