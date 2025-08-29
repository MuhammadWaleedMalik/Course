
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.scss';

    
// Define types
interface StudentInfo {
  name: string;
  email: string;
  enrollmentDate: string;
  nextPaymentDate: string;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

// Mock data
const mockStudentData: StudentInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  enrollmentDate: "2023-09-15",
  nextPaymentDate: "2023-12-15",
};

// Mock video counts for progress calculation (since videos are in course pages)
const mockFrontendVideoCount = 6; // Matches previous mockFrontendVideos
const mockBackendVideoCount = 6; // Matches previous mockBackendVideos

const StudentDashboard: React.FC = () => {
  const [studentInfo] = useState<StudentInfo>(mockStudentData);
  const [completedFrontendVideos, setCompletedFrontendVideos] = useState<string[]>([]);
  const [completedBackendVideos, setCompletedBackendVideos] = useState<string[]>([]);
  const [daysUntilPayment, setDaysUntilPayment] = useState(0);
  const [zoomLink] = useState<string | null>(null); // Placeholder for Zoom link

  useEffect(() => {
    // Load completed videos from localStorage
    const savedFrontend = JSON.parse(localStorage.getItem('completedFrontendVideos') || '[]');
    const savedBackend = JSON.parse(localStorage.getItem('completedBackendVideos') || '[]');
    setCompletedFrontendVideos(savedFrontend);
    setCompletedBackendVideos(savedBackend);

    // Calculate days until next payment
    const nextPaymentDate = new Date(studentInfo.nextPaymentDate);
    const today = new Date();
    const diffTime = nextPaymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilPayment(diffDays);
  }, [studentInfo.nextPaymentDate]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const frontendProgress = mockFrontendVideoCount > 0
    ? Math.round((completedFrontendVideos.length / mockFrontendVideoCount) * 100)
    : 0;

  const backendProgress = mockBackendVideoCount > 0
    ? Math.round((completedBackendVideos.length / mockBackendVideoCount) * 100)
    : 0;

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="account-info">
            <h3>Account Information</h3>
            <div className="info-item">
              <label>Email:</label>
              <span>{studentInfo.email}</span>
            </div>
            <div className="info-item">
              <label>Enrollment Date:</label>
              <span>{formatDate(studentInfo.enrollmentDate)}</span>
            </div>
            <div className="info-item">
              <label>Next Payment Due:</label>
              <span>{formatDate(studentInfo.nextPaymentDate)}</span>
            </div>
          </div>

          <div className="progress-overview">
            <h3>Overall Progress</h3>
            <div className="progress-item">
              <label>Frontend:</label>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${frontendProgress}%` }}></div>
              </div>
              <span>{frontendProgress}%</span>
            </div>
            <div className="progress-item">
              <label>Backend:</label>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${backendProgress}%` }}></div>
              </div>
              <span>{backendProgress}%</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Welcome and Payment Alert */}
          <div className="welcome-payment">
            <div className="user-info">
              <span>Welcome, {studentInfo.name}</span>
                <Link 
                    to={"/contactus"}
                    className="logout-btn">Contact Us 
                </Link>
                <Link 
                    to={"/logout"}
                    className="logout-btn">Logout
                </Link>
            </div>

            {daysUntilPayment <= 30 && (
              <div className={`payment-alert ${daysUntilPayment <= 7 ? 'urgent' : 'warning'}`}>
                <div className="alert-content">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-text">
                    <h3>Your next payment is due in {daysUntilPayment} days</h3>
                    <p>Please make payment to continue accessing the course materials</p>
                  </div>
                  <button className="payment-btn">Make Payment</button>
                </div>
              </div>
            )}

            <div className="zoom-section">
              <a
                href={zoomLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`zoom-button ${!zoomLink ? 'disabled' : ''}`}
              >
                Join Zoom Meeting
              </a>
            </div>
          </div>

          {/* Frontend Course Section */}
          <section className="course-section">
            <h2>Frontend Course</h2>
            <p className="course-description">
              Ali is a skilled frontend developer with years of experience in building responsive and dynamic web applications.
            </p>
            <Link to="/frontend-by-ali" className="course-link">
              Frontend Course by Ali
            </Link>
          </section>

          {/* Backend Course Section */}
          <section className="course-section">
            <h2>Backend Course</h2>
            <p className="course-description">
              Waleed is an expert backend developer specializing in scalable server-side solutions and API development.
            </p>
            <Link to="/backend-by-waleed" className="course-link">
              Backend Course by Waleed
            </Link>
          </section>



          {/* Assignment Upload Link */}
          <section className="course-section">
            <h2>Upload Assignment</h2>
            <Link to="/assignment-upload" className="course-link">
              Upload Assignment
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;

