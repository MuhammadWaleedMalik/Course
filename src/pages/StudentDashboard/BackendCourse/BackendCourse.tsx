
import React, { useState, useEffect } from 'react';
import './BackendCourse.scss';
import VideoPlayer from '../../../components/Buttons/VideoPlayer/VideoPlayer';

// Define types
interface Video {
  id: string;
  title: string;
  videoUrl: string; // URL to uploaded video
}

interface ResourceLink {
  title: string;
  url: string;
}

// Mock data (Backend videos)
const mockBackendVideos: Video[] = [
  { id: "be1", title: "Node.js Introduction", videoUrl: "/videos/node-intro.mp4" },
  { id: "be2", title: "Express.js Basics", videoUrl: "/videos/express-basics.mp4" },
  { id: "be3", title: "MongoDB Fundamentals", videoUrl: "/videos/mongodb-fundamentals.mp4" },
  { id: "be4", title: "REST API Development", videoUrl: "/videos/rest-api.mp4" },
  { id: "be5", title: "Authentication with JWT", videoUrl: "/videos/jwt-auth.mp4" },
  { id: "be6", title: "Backend Project", videoUrl: "/videos/backend-project.mp4" }
];

// Mock React resources
const reactResources: ResourceLink[] = [
  { title: "React Official Documentation", url: "https://react.dev/" },
  { title: "React Hooks Guide", url: "https://react.dev/reference/react" },
  { title: "Building with React", url: "https://react.dev/learn" }
];

const BackendCourse: React.FC = () => {
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const totalVideos = mockBackendVideos.length;
  const progress = totalVideos > 0 ? Math.round((completedVideos.length / totalVideos) * 100) : 0;

  const handleVideoComplete = (videoId: string) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  useEffect(() => {
    // Load completed videos from localStorage for persistence
    const savedCompleted = JSON.parse(localStorage.getItem('completedBackendVideos') || '[]');
    setCompletedVideos(savedCompleted);
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('completedBackendVideos', JSON.stringify(completedVideos));
  }, [completedVideos]);

  return (
    <div className="backend-course">
      <div className="background-animation">
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
      </div>
      {/* Simple Heading */}
      <h1>BACKEND BY WALEED</h1>

      {/* Overall Progress Bar */}
      <div className="progress-bar-container">
        <h3>Course Progress: {progress}%</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Backend Course Section */}
      <section className="course-section">
        <h2>Backend Course</h2>
        <p>{totalVideos} Videos</p>
        <ul className="video-list">
          {mockBackendVideos.map(video => (
            <li key={video.id} className="video-item">
              <span className="video-title">{video.title}</span>
              {completedVideos.includes(video.id) && <span className="checkmark">✓</span>}
              <VideoPlayer
                src={video.videoUrl}
                containerClassName="video-player-button"
                playButtonSize={60}
                initialText=""
                onComplete={() => handleVideoComplete(video.id)}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* React Resources Section */}
      <section className="resources-section">
        <h2>React Resources</h2>
        <ul className="resources-list">
          {reactResources.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BackendCourse;

