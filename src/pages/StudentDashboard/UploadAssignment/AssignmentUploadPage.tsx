
import React, { useState, FormEvent, useEffect } from 'react';
import './AssignmentUploadPage.scss';
import Btn1 from '../../../components/Buttons/BTN1/Btn1';

// Define types
interface FormData {
  courseType: 'frontend' | 'backend';
  title: string;
  file: File | null;
}

const AssignmentUploadPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    courseType: 'frontend',
    title: '',
    file: null,
  });
  const [error, setError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Validate form on changes to title or file
  useEffect(() => {
    setIsFormValid(formData.title.trim() !== '' && formData.file !== null);
  }, [formData.title, formData.file]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setError('');
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      setError('Assignment title is required');
      return;
    }
    if (!formData.file) {
      setError('Assignment file is required');
      return;
    }
    setError('');
    // Placeholder for backend integration
    console.log('Assignment submitted:', {
      courseType: formData.courseType,
      title: formData.title,
      file: formData.file?.name,
    });
    // Reset form
    setFormData({ courseType: 'frontend', title: '', file: null });
  };

  return (
    <div className="assignment-upload-page">
      <div className="background-animation">
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
        <div className="code-bubble"></div>
      </div>
      <h1>Upload Assignment</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseType">Course Type</label>
          <select
            id="courseType"
            name="courseType"
            value={formData.courseType}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Assignment Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter assignment title"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignmentFile">Upload Assignment</label>
          <input
            type="file"
            id="assignmentFile"
            name="assignmentFile"
            accept="*/*"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <Btn1
          defaultText="UPLOAD ASSIGNMENT"
          successText="ASSIGNMENT UPLOADED"
          disabled={!isFormValid}
        />
      </form>
    </div>
  );
};

export default AssignmentUploadPage;
