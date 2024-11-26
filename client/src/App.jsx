import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import PageNotFound from './scenes/PageNotFound';
import Feed from './scenes/Feed';
import TesterScene from './scenes/TesterScene.jsx';
import Post from './scenes/Post.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/test" element={<TesterScene />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
