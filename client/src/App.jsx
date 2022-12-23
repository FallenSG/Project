import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgotPass from './pages/ForgotPass';
import ForgotPass2 from './pages/ForgotPass2';
import Sample from './pages/sample';
import Genre from './pages/Genre';
import BookID from './pages/BookID';
import CreateBook from './pages/CreateBook';
import ModifyBook from './pages/ModifyBook'
import VerifyExpired from './pages/VerifyExpired';
import Library from './pages/Library'
import Author from './pages/Author'
import Ranking from './pages/Ranking'

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
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/createBook" element={<CreateBook />} />
        <Route exact path="/author/:authorid" element={<Author />} />
        <Route exact path="/genre/:genreid" element={<Genre />} />
        <Route exact path="/book/:bookid" element={<BookID />} />
        <Route exact path="/modifyBook/:bookid" element={<ModifyBook />} />
        <Route exact path="/library" element={<Library />} />
        <Route exact path="/ranking/:rankType" element={<Ranking />} />
        <Route exact path="/sample" element={<Sample />} />
      </Routes>
    </Router>
  );
}
