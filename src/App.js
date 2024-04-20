import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import { Auth } from "./components/auth";
import { DashBoard } from "./components/dashboard";
import { LandingPage } from './components/LandingPage';
import Login  from './components/auth/login'
import Signup from './components/auth/signup';
import Forgot_Pass from './components/auth/forgot_pass';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
 
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="website" replace />} />
        <Route path="website" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="" element={<PrivateRoute/>}>
          <Route path="signup" element={<Signup />} />
          <Route path="forgotPass" element={<Forgot_Pass />} />
          <Route path="userProfile" element={<DashBoard/>}/>
          <Route path="*" element={<Navigate to="login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
