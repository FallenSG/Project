import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Dashboard from './pages/Dashboard'
import ForgotPass from './pages/ForgotPass'
import Sample from "./pages/sample";

export default function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sign_in' element={<Login />} />
                <Route path='/sign_up' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPass />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/sample' element={<Sample />} />
            </Routes>
        </Router>
    )
}
