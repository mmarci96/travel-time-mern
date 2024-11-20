import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import PageNotFound from './scenes/PageNotFound';
import Feed from './scenes/Feed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
