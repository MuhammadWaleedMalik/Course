
import React, { useState, FormEvent } from 'react';
import './VideoUploadPage.scss';

// Define types
interface FormData {
  videoType: 'frontend' | 'backend';
  title: string;
  file: File | null;
}

const VideoUploadPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    videoType: 'frontend',
    title: '',
    file: null,
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid video file (.mp4, .webm, .ogg)');
        return;
      }
      setError('');
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      setError('Video title is required');
      return;
    }
    if (!formData.file) {
      setError('Video file is required');
      return;
    }
    setError('');
    // Placeholder for backend integration
    console.log('Form submitted:', {
      videoType: formData.videoType,
      title: formData.title,
      file: formData.file?.name,
    });
    // Reset form
    setFormData({ videoType: 'frontend', title: '', file: null });
  };

  return (
    <div className="video-upload-page">
      <h1>Upload Video</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="videoType">Video Type</label>
          <select
            id="videoType"
            name="videoType"
            value={formData.videoType}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Video Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter video title"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoFile">Upload Video</label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            accept="video/mp4,video/webm,video/ogg"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default VideoUploadPage;

