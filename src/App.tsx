import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Stairs from './components/Stairs/Stairs';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Courses from './pages/Courses/Courses';

// Lazy load heavy components
const Home = lazy(() => import('./pages/home/Home'));
const FAQs = lazy(() => import('./pages/FAQs/Faqs'));
const Terms = lazy(() => import('./pages/Terms/Terms'));
const Privacy = lazy(() => import('./pages/Privacy/Privacy'));
const CookiePolicy = lazy(() => import('./pages/Cookies/Cookies'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPage/BlogPost'));
const AlumniPage = lazy(() => import('./pages/Alumini/Alumini'));
const AlumniPost = lazy(() => import('./pages/Alumini/AluminPage/AluminiPost'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Login = lazy(() => import('./pages/Login/Login'));
const Aboutus = lazy(() => import('./pages/Aboutus/Aboutus'));
const Roadmap = lazy(() => import('./pages/Roadmap/Roadmap'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard/StudentDashboard'));
const VideoUploadPage = lazy(() => import('./pages/StudentDashboard/UploadVideo/VideoUploadPage'));
const BackendCourse = lazy(() => import('./pages/StudentDashboard/BackendCourse/BackendCourse'));
const FrontendCourse = lazy(() => import('./pages/StudentDashboard/FrontendCourse/FrontendCourse'));
const AssignmentUploadPage = lazy(() => import('./pages/StudentDashboard/UploadAssignment/AssignmentUploadPage'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard/AdminDashboard'));
const Collaborators = lazy(() => import('./pages/Collaborators/Collaborators'));

// Define TypeScript interface for LocomotiveScroll
interface LocomotiveScrollInstance {
  destroy: () => void;
  update: () => void;
  start: () => void;
  stop: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
}

// Custom hook to handle LocomotiveScroll with TypeScript
const useLocomotiveScroll = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const locomotiveScroll = useRef<LocomotiveScrollInstance | null>(null);

  useEffect(() => {
    // Only initialize on client-side
    if (typeof window !== 'undefined' && scrollRef.current) {
      import('locomotive-scroll').then((LocomotiveScrollModule) => {
        const LocomotiveScroll = LocomotiveScrollModule.default;
        
        // Initialize LocomotiveScroll
        locomotiveScroll.current = new LocomotiveScroll({
          smooth: true,
          element: scrollRef.current,
          lerp: 0.1,
          multiplier: 1,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        }) as any;

        // Update scroll on route change
        setTimeout(() => {
          locomotiveScroll.current?.start();
          locomotiveScroll.current?.update();
        }, 300);
      });
    }

    // Cleanup on unmount or route change
    return () => {
      if (locomotiveScroll.current) {
        locomotiveScroll.current.destroy();
        locomotiveScroll.current = null;
      }
    };
  }, [location.pathname]);

  return scrollRef;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const scrollRef = useLocomotiveScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload critical assets only
  useEffect(() => {
    const preloadCriticalAssets = async () => {
      // Only preload absolutely essential assets
      const criticalAssets: string[] = [
        // Add only the most critical assets here (logo, essential images)
      ];
      
      try {
        await Promise.all(
          criticalAssets.map((src, index) => {
            return new Promise((resolve, reject) => {
              if (src.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.src = src;
                video.onloadeddata = () => {
                  setProgress(((index + 1) / criticalAssets.length) * 100);
                  resolve(true);
                };
                video.onerror = reject;
              } else {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                  setProgress(((index + 1) / criticalAssets.length) * 100);
                  resolve(true);
                };
                img.onerror = reject;
              }
            });
          })
        );
      } catch (error) {
        console.error("Error preloading assets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set a timeout to ensure we don't get stuck in loading state
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    preloadCriticalAssets();

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingSpinner progress={progress} />;
  }

  return (
    <div className="min-h-screen flex flex-col" data-scroll-container ref={scrollRef}>
      <Header />
      <main className="flex-1">
        <Stairs>
          <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/courses" element={<Courses />} />
             
             
            </Routes>
          </Suspense>
        </Stairs>
      </main>
      <Footer />
    </div>
  );
};

export default App;