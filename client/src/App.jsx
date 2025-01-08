import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './scenes/Home';
import PageNotFound from './scenes/PageNotFound';
import Feed from './scenes/Feed';
import TesterScene from './scenes/TesterScene.jsx';
import Post from './scenes/Post.jsx';
import TopNavBar from './components/navigation/TopNavBar.jsx';
import BotNavBar from './components/navigation/BotNavBar.jsx';
import Create from './scenes/Create.jsx';

function App() {
    return (
        <BrowserRouter>
            <TopNavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/test" element={<TesterScene />} />
                <Route path="/create" element={<Create />} />
                <Route path="/post/:postId" element={<Post />} />
            </Routes>
            <BotNavBar />
        </BrowserRouter>
    );
}

export default App;
