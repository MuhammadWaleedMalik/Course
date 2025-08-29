
import React, { useState, useEffect } from 'react';
import './FrontendCourse.scss';
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

// Mock data (Frontend videos)
const mockFrontendVideos: Video[] = [
  { id: "fe1", title: "HTML & CSS Fundamentals", videoUrl: "/videos/html-css.mp4" },
  { id: "fe2", title: "JavaScript Basics", videoUrl: "/videos/js-basics.mp4" },
  { id: "fe3", title: "Advanced JavaScript", videoUrl: "/videos/advanced-js.mp4" },
  { id: "fe4", title: "React Introduction", videoUrl: "/videos/react-intro.mp4" },
  { id: "fe5", title: "State Management", videoUrl: "/videos/state-management.mp4" },
  { id: "fe6", title: "Frontend Project", videoUrl: "/videos/frontend-project.mp4" }
];

// Mock React resources
const reactResources: ResourceLink[] = [
  { title: "React Official Documentation", url: "https://react.dev/" },
  { title: "React Hooks Guide", url: "https://react.dev/reference/react" },
  { title: "Building with React", url: "https://react.dev/learn" }
];

const FrontendCourse: React.FC = () => {
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const totalVideos = mockFrontendVideos.length;
  const progress = totalVideos > 0 ? Math.round((completedVideos.length / totalVideos) * 100) : 0;

  const handleVideoComplete = (videoId: string) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  useEffect(() => {
    // Load completed videos from localStorage for persistence
    const savedCompleted = JSON.parse(localStorage.getItem('completedFrontendVideos') || '[]');
    setCompletedVideos(savedCompleted);
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('completedFrontendVideos', JSON.stringify(completedVideos));
  }, [completedVideos]);

  return (
    <div className="frontend-course">
      <div className="background-animation">
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
      </div>
      {/* Simple Heading */}
      <h1>FRONTEND BY ALI</h1>

      {/* Overall Progress Bar */}
      <div className="progress-bar-container">
        <h3>Course Progress: {progress}%</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Frontend Course Section */}
      <section className="course-section">
        <h2>Frontend Course</h2>
        <p>{totalVideos} Videos</p>
        <ul className="video-list">
          {mockFrontendVideos.map(video => (
            <li key={video.id} className="video-item">
              <span className="video-title">{video.title}</span>
              {completedVideos.includes(video.id) && <span className="checkmark">✓</span>}
              <VideoPlayer
                videoUrl={video.videoUrl}
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

export default FrontendCourse;

