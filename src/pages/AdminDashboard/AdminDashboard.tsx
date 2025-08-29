import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './Admindashboard.scss';
import Btn1 from '../../components/Buttons/BTN1/Btn1';

// Define types
interface AdminInfo {
  name: string;
  email: string;
  role: string;
}

interface VideoUpload {
  title: string;
  file: File | null;
  courseType: 'frontend' | 'backend';
}

interface FormErrors {
  title?: string;
  file?: string;
  courseType?: string;
}

// Mock data
const mockAdminData: AdminInfo = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'Admin',
};

const mockFrontendVideoCount = 6; // Matches StudentDashboard
const mockBackendVideoCount = 6; // Matches StudentDashboard

const AdminDashboard: React.FC = () => {
  const [adminInfo] = useState<AdminInfo>(mockAdminData);
  const [zoomLink, setZoomLink] = useState<string | null>(null);
  const [formData, setFormData] = useState<VideoUpload>({ title: '', file: null, courseType: 'frontend' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Mock fetching Zoom link (replace with real API call)
    // Example: fetch('/api/zoom-link').then(res => setZoomLink(res.link));
  }, []);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.file) {
      newErrors.file = 'Video file is required';
    } else if (!['video/mp4', 'video/quicktime', 'video/webm'].includes(formData.file.type)) {
      newErrors.file = 'Invalid file type. Use .mp4, .mov, or .webm';
    }
    if (!formData.courseType) newErrors.courseType = 'Course type is required';
    return newErrors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setSubmitMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('idle');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('file', formData.file!);
      formDataToSend.append('courseType', formData.courseType);

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Video uploaded successfully!');
        setFormData({ title: '', file: null, courseType: 'frontend' });
        setErrors({});
      } else {
        throw new Error('Failed to upload video');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to upload video. Please try again later.');
    }
  };

  return (
    <div className="adminDashboard">
      <div className="particles">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <header className="dashboardHeader">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboardContent">
        <aside className="sidebar">
          <div className="accountInfo">
            <h3>Account Information</h3>
            <div className="infoItem">
              <label>Name:</label>
              <span>{adminInfo.name}</span>
            </div>
            <div className="infoItem">
              <label>Email:</label>
              <span>{adminInfo.email}</span>
            </div>
            <div className="infoItem">
              <label>Role:</label>
              <span>{adminInfo.role}</span>
            </div>
          </div>

          <div className="videoStats">
            <h3>Video Upload Stats</h3>
            <div className="statsItem">
              <label>Frontend Videos:</label>
              <span>{mockFrontendVideoCount}</span>
            </div>
            <div className="statsItem">
              <label>Backend Videos:</label>
              <span>{mockBackendVideoCount}</span>
            </div>
          </div>
        </aside>

        <main className="mainContent">
          <div className="adminControls">
            <div className="userInfo">
              <span>Welcome, {adminInfo.name}</span>
              <Link to="/contact" className="supportBtn">Contact Support</Link>
              <Link to="/logout" className="logoutBtn">Logout</Link>
            </div>

            <div className="zoomSection">
              <h3>Manage Zoom Meeting</h3>
              <input
                type="text"
                value={zoomLink || ''}
                onChange={(e) => setZoomLink(e.target.value)}
                placeholder="Enter Zoom meeting link"
                className="zoomInput"
              />
              <a
                href={zoomLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`zoomButton ${!zoomLink ? 'disabled' : ''}`}
              >
                Start Zoom Meeting
              </a>
            </div>

            <div className="uploadSection">
              <h3>Upload Video</h3>
              <form onSubmit={handleSubmit}>
                <div className="formGroup">
                  <label htmlFor="title">Video Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={errors.title ? 'error' : ''}
                  />
                  {errors.title && <span className="errorMessage">{errors.title}</span>}
                </div>
                <div className="formGroup">
                  <label htmlFor="file">Video File</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".mp4,.mov,.webm"
                    onChange={handleFileChange}
                    className={errors.file ? 'error' : ''}
                  />
                  {errors.file && <span className="errorMessage">{errors.file}</span>}
                </div>
                <div className="formGroup">
                  <label htmlFor="courseType">Course Type</label>
                  <select
                    id="courseType"
                    name="courseType"
                    value={formData.courseType}
                    onChange={handleInputChange}
                    className={errors.courseType ? 'error' : ''}
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                  </select>
                  {errors.courseType && <span className="errorMessage">{errors.courseType}</span>}
                </div>
                <Btn1
                  defaultText="Upload Video"
                  successText="Uploaded"
                  primaryColor="var(--secondary-color-1)"
                  primaryDark="var(--primary-color-1)"
                  primaryDarkest="var(--primary-color-3)"
                  successColor="var(--primary-color-4)"
                  showDribbble={false}
                  showTwitter={false}
                  disabled={submitStatus === 'submitting'}
                />
                {submitMessage && (
                  <p
                    className={
                      submitStatus === 'success'
                        ? 'successMessage'
                        : 'errorMessage'
                    }
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;