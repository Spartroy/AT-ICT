import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Info pages
import Home from "./pages/info/Home";
import About from "./pages/info/About";
import ContactUs from "./pages/info/ContactUs";
import Curriculum from "./pages/info/Curriculum";
import FAQ from "./pages/info/FAQ";
import Fees from "./pages/info/Fees";
import Samples from "./pages/info/Samples";

// Auth pages
import SignIn from "./pages/auth/SignIn";
import Registration from "./pages/auth/Registration";

// Portal pages
import TeacherDashboard from "./pages/portal/TeacherDashboard";
import StudentDashboard from "./pages/portal/StudentDashboard";
import ParentDashboard from "./pages/portal/ParentDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Info Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/samples" element={<Samples />} />
          
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Registration />} />
          
          {/* Portal Routes */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
        </Routes>
        
        {/* Toast Container for notifications */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-gray-800 text-white"
          progressClassName="bg-[#CA133E]"
        />
      </div>
    </Router>
  );
}

export default App;
