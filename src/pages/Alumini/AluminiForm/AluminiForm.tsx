import React, { useState, useEffect } from 'react';
import './AlumniForm.scss';
import Btn1 from '../../../components/Buttons/BTN1/Btn1';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { addAlumni, updateAlumni, updateloader, updateerror } from '../../../store/reducers/alumnilist/Alumnilist';

interface Alumni {
  id: number;
  name: string;
  bio: string;
  graduationYear: string;
  skills: string[];
  photo: string | null;
  university: string;
  authorId: number;
}

interface AlumniFormData {
  name: string;
  bio: string;
  graduationYear: string;
  skills: string[];
  photo: File | string | null;
  university: string;
}

interface AlumniFormProps {
  onSuccess?: () => void;
  existingAlumni?: Alumni;
}

const predefinedSkills = [
  'Businessman', 'Engineer', 'Computer Scientist', 'Doctor', 'Lawyer', 'Teacher', 'Artist', 'Scientist',
  'Accountant', 'Nurse', 'Architect', 'Pharmacist', 'Journalist', 'Musician', 'Designer', 'Pilot',
  'Chef', 'Athlete', 'Programmer', 'Marketing Specialist', 'Financial Analyst', 'Human Resources',
  'Sales Representative', 'Other'
];

const AlumniForm: React.FC<AlumniFormProps> = ({ onSuccess, existingAlumni }) => {
  const isEdit = !!existingAlumni;
  const [formData, setFormData] = useState<AlumniFormData>({
    name: '',
    bio: '',
    graduationYear: '',
    skills: [],
    photo: null,
    university: '',
  });
  const [skillInput, setSkillInput] = useState<string>('');
  const [errors, setErrors] = useState<Partial<AlumniFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (existingAlumni) {
      setFormData({
        name: existingAlumni.name,
        bio: existingAlumni.bio,
        graduationYear: existingAlumni.graduationYear,
        skills: existingAlumni.skills.slice(),
        photo: existingAlumni.photo,
        university: existingAlumni.university,
      });
    }
  }, [existingAlumni]);

  const validateForm = (): boolean => {
    const newErrors: Partial<AlumniFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';
    if (!formData.university.trim()) newErrors.university = 'University is required';
    if (formData.skills.length === 0) newErrors.skills = ['At least one skill is required'];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const addPredefinedSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setErrors((prev) => ({ ...prev, skills: undefined }));
    }
  };

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
        setSkillInput('');
        setErrors((prev) => ({ ...prev, skills: undefined }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isEdit && !currentUser) {
      setSuccessMessage('Please log in to create an alumni profile.');
      return;
    }

    setIsSubmitting(true);
    dispatch(updateloader(true));
    setSuccessMessage('');

    try {
      let photoUrl: string | null = null;
      if (formData.photo instanceof File) {
        photoUrl = URL.createObjectURL(formData.photo);
      } else {
        photoUrl = formData.photo as string | null;
      }

      const alumniData: Alumni = {
        id: isEdit ? existingAlumni!.id : Date.now(),
        name: formData.name,
        bio: formData.bio,
        graduationYear: formData.graduationYear,
        skills: formData.skills,
        photo: photoUrl,
        university: formData.university,
        authorId: isEdit ? existingAlumni!.authorId : currentUser!.id,
      };

      if (isEdit) {
        dispatch(updateAlumni(alumniData));
      } else {
        dispatch(addAlumni(alumniData));
      }

      setSuccessMessage(`Alumni profile ${isEdit ? 'updated' : 'created'} successfully!`);
      if (!isEdit) {
        setFormData({ name: '', bio: '', graduationYear: '', skills: [], photo: null, university: '' });
        setSkillInput('');
      }
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 300);
    } catch (error) {
      console.error('Submission error:', error);
      dispatch(updateerror('Error processing alumni profile. Please try again.'));
      setSuccessMessage('Error processing alumni profile. Please try again.');
    } finally {
      setIsSubmitting(false);
      dispatch(updateloader(false));
    }
  };

  return (
    <div className="alumni-form-container">
      <h1 className="alumni-form-title">{isEdit ? 'Edit' : 'Create'} an Alumni Profile</h1>
      <form onSubmit={handleSubmit} className="alumni-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter alumni name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span id="name-error" className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="university">University</label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="Enter university name"
            aria-invalid={!!errors.university}
            aria-describedby={errors.university ? 'university-error' : undefined}
          />
          {errors.university && <span id="university-error" className="error">{errors.university}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Enter a short bio"
            rows={3}
            aria-invalid={!!errors.bio}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
          />
          {errors.bio && <span id="bio-error" className="error">{errors.bio}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="graduationYear">Graduation Year</label>
          <input
            type="text"
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="Enter graduation year (e.g., 2023)"
            aria-invalid={!!errors.graduationYear}
            aria-describedby={errors.graduationYear ? 'graduationYear-error' : undefined}
          />
          {errors.graduationYear && <span id="graduationYear-error" className="error">{errors.graduationYear}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="photo">Profile Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {formData.photo && typeof formData.photo === 'string' && (
            <span className="file-name">Current: {formData.photo}</span>
          )}
          {formData.photo && formData.photo instanceof File && (
            <span className="file-name">{formData.photo.name}</span>
          )}
        </div>

        <div className="form-group">
          <label>Predefined Skills</label>
          <div className="predefined-skills">
            {predefinedSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                className={`predefined-skill-button ${formData.skills.includes(skill) ? 'added' : ''}`}
                onClick={() => addPredefinedSkill(skill)}
                disabled={formData.skills.includes(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Custom Skills</label>
          <input
            type="text"
            id="skills"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillInput}
            placeholder="Add custom skills (press Enter or comma)"
            aria-describedby="skills-help"
          />
          <div id="skills-help" className="skills-help">Press Enter or comma to add a custom skill.</div>
          <div className="skills-list">
            {formData.skills.map((skill) => (
              <span key={skill} className="skill">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
          {errors.skills && <span className="error">{errors.skills}</span>}
        </div>

        <Btn1
          defaultText={isSubmitting ? 'Submitting...' : isEdit ? 'Update Alumni Profile' : 'Create Alumni Profile'}
          successText="Submitted!"
          primaryColor="var(--accent)"
          primaryDark="var(--secondary-color-1)"
          primaryDarkest="var(--primary-color-3)"
          successColor="var(--primary-color-4)"
          showDribbble={false}
          showTwitter={false}
          onClick={() => document.querySelector('form')?.requestSubmit()}
        />
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AlumniForm;