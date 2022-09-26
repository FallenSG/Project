import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgotPass from './pages/ForgotPass';
import ForgotPass2 from './pages/ForgotPass2';
import Sample from './pages/sample';
import BookID from './pages/BookID';
import VerifyExpired from './pages/VerifyExpired';

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
        <Route exact path="/book/:bookid" element={<BookID />} />
        <Route exact path="/sample" element={<Sample />} />
      </Routes>
    </Router>
  );
}
