import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './AlumniPost.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlumni } from '../../../store/reducers/alumnilist/Alumnilist';
import AlumniForm from '../AluminiForm/AluminiForm';
import { RootState, AppDispatch } from '../../../store';

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

const AlumniPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const alumni = useSelector((state: RootState) => state.alumni.alumni);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const selectedAlumni = alumni.find((alumnus) => alumnus.id === parseInt(id || '0')) || null;

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const isAuthor = currentUser?.id === selectedAlumni?.authorId;
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this alumni profile?')) {
      if (selectedAlumni) {
        dispatch(deleteAlumni(selectedAlumni.id));
        navigate('/alumni');
      }
    }
  };

  return (
    <div className="alumni-post-container">
      <div className="particles">
        {Array.from({ length: 60 }).map((_, index) => (
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

      {selectedAlumni ? (
        <div className="alumni-post-content">
          <h1 className="alumni-post-name">{selectedAlumni.name}</h1>
          <span className="alumni-post-university">{selectedAlumni.university}</span>
          <span className="alumni-post-graduation-year">Class of {selectedAlumni.graduationYear}</span>
          {selectedAlumni.photo && (
            <img src={selectedAlumni.photo} alt={selectedAlumni.name} className="alumni-post-image" />
          )}
          <div className="alumni-post-skills">
            {selectedAlumni.skills.map((skill) => (
              <span key={skill} className="alumni-post-skill">{skill}</span>
            ))}
          </div>
          <p className="alumni-post-bio">{selectedAlumni.bio}</p>

          <div className="alumni-actions">
            {isAuthor && (
              <button className="edit-alumni-button" onClick={() => setShowEditModal(true)}>
                Edit
              </button>
            )}
            {(isAuthor || isAdmin) && (
              <button className="delete-alumni-button" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>

          <Link to="/alumni" className="back-to-alumni-button">
            Back to Alumni
          </Link>
        </div>
      ) : (
        <div className="no-alumni-found">
          <h2>Alumni Not Found</h2>
          <Link to="/alumni" className="back-to-alumni-button">
            Back to Alumni
          </Link>
        </div>
      )}

      {showEditModal && selectedAlumni && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-button" onClick={() => setShowEditModal(false)}>
              ×
            </button>
            <AlumniForm existingAlumni={selectedAlumni} onSuccess={() => setShowEditModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniPost;