import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ForgotPass from './pages/ForgotPass';
import ForgotPass2 from './pages/ForgotPass2';
import Sample from './pages/sample';
import Genre from './pages/Genre';
import BookID from './pages/BookID';
import VerifyExpired from './pages/VerifyExpired';
import Library from './pages/Library'
import Author from './pages/Author'
import Ranking from './pages/Ranking'
import Reset from './pages/Reset'
import PublishList from './pages/PublishList';
import PublishView from './pages/PublishView';
import { PublishChapCreate, PublishChapEdit } from './pages/PublishChapter'
import PublishModify from './pages/PublishModify';
import PublishCreate from './pages/PublishCreate';
import ChapReading from './pages/ChapReading';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign_in" element={<Login />} />
        <Route exact path="/sign_up" element={<Signup />} />
        <Route exact path="/forgot-password" element={<ForgotPass />} />
        <Route exact path="/forgot-password/:token" element={<ForgotPass2 />} />
        <Route exact path="/verify/token-expire" element={<VerifyExpired />} />
        <Route exact path="/author/:authorid" element={<Author />} />
        <Route exact path="/genre/:genreid" element={<Genre />} />
        <Route exact path="/book/:bookid" element={<BookID />} />
        <Route exact path="/chapter/:chapId" element={<ChapReading />} />
        <Route exact path="/library" element={<Library />} />
        <Route exact path="/ranking/:rankType" element={<Ranking />} />
        <Route exact path="/sample" element={<Sample />} />
        <Route exact path="/reset-password" element={<Reset />} />
        <Route exact path="/publish/list" element={<PublishList />} />
        <Route exact path="/publish/view/:bookId" element={<PublishView />} />
        <Route exact path="/publish/modify/:bookId" element={<PublishModify />} />
        <Route exact path="/publish/create" element={<PublishCreate />} />
        <Route exact path="/publish/chapter/create/:bookId" element={<PublishChapCreate />} />
        <Route exact path="/publish/chapter/edit/:chapId" element={<PublishChapEdit />} />
      </Routes>
    </Router>
  );
}
