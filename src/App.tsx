import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import FAQs from './pages/FAQs/Faqs';
import Terms from './pages/Terms/Terms';
import Privacy from './pages/Privacy/Privacy';
import CookiePolicy from './pages/Cookies/Cookies';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPage/BlogPost';
import AlumniPage from './pages/Alumini/Alumini';
import AlumniPost from './pages/Alumini/AluminPage/AluminiPost';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Aboutus from './pages/Aboutus/Aboutus';
import Roadmap from './pages/Roadmap/Roadmap';
import Pricing from './pages/Pricing/Pricing';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import VideoUploadPage from './pages/StudentDashboard/UploadVideo/VideoUploadPage';
import BackendCourse from './pages/StudentDashboard/BackendCourse/BackendCourse';
import FrontendCourse from './pages/StudentDashboard/FrontendCourse/FrontendCourse';
import AssignmentUploadPage from './pages/StudentDashboard/UploadAssignment/AssignmentUploadPage';
import Contact from './pages/Contact/Contact';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Collaborators from './pages/Collaborators/Collaborators';
import Stairs from './components/Stairs/Stairs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {/* Wrap Routes with Stairs for isolated transition effect */}
            <Stairs>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/studentdashboard" element={<StudentDashboard />} />
                <Route path="/backend-by-waleed" element={<BackendCourse />} />
                <Route path="/frontend-by-ali" element={<FrontendCourse />} />
                <Route path="/assignment-upload" element={<AssignmentUploadPage />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/uploadvideo" element={<VideoUploadPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookie" element={<CookiePolicy />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/collaborators" element={<Collaborators />} />
                <Route path="/alumni" element={<AlumniPage />} />
                <Route path="/alumni/:id" element={<AlumniPost />} />
              </Routes>
            </Stairs>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;