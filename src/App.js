import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Auth } from "./components/auth";
import { DashBoard } from "./components/dashboard";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Forgot_Pass from "./components/auth/forgot_pass";
import PrivateRoute from "./components/auth/PrivateRoute";
import { DashboardTimeSheet } from "./components/dashboard/dashboardTimeSheet";
import { Approval } from "./components/admin/approval";
import { TimeSheet } from "./components/admin/timesheet";
import { Home } from "./components/dashboard/home";
import { AdminHome } from "./components/admin/adminhome";
import { CreateTimeSheet } from "./components/admin/createTimeSheet";
import { PendingApproval } from "./components/admin/pendingApproval";
import { Logout } from "./components/auth/logout";
import { AdminProfile } from "./components/admin/adminprofile";
import { Profile } from "./components/dashboard/profile";
import { PdfView } from "./components/admin/pdfview";
import { Payroll } from "./components/dashboard/payroll";
import { Desktop } from "./components/website";
import { Register } from "./components/website/register";
import { ContactUp } from "./components/website/contactup";
import { Contact_Us } from "./components/website/contact_us";
import { Benefit } from "./components/dashboard/benefit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="website" replace />} />
        {/* <Route path="website" element={<LandingPage />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="website" element={<Desktop />} />
        <Route path="flexersignup" element={<Register />} />
        <Route path="clientHire" element={<ContactUp />} />
        <Route path="contact" element={<Contact_Us />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="logout" element={<Logout />} />
          <Route path="forgotPass" element={<Forgot_Pass />} />
          <Route path="user/onboard" element={<Home />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/timesheet" element={<DashboardTimeSheet />} />
          <Route path="user/benefit" element={<Benefit />} />
          <Route path="user/payroll" element={<Payroll />} />
          <Route path="admin" element={<AdminHome />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/timesheet" element={<TimeSheet />} />
          <Route path="admin/approval" element={<Approval />} />
          <Route path="admin/create" element={<CreateTimeSheet />} />
          <Route path="admin/pendingApproval" element={<PendingApproval />} />
          <Route path="pdfview" element={<PdfView />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
