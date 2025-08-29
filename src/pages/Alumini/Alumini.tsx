import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Alumni.scss';
import Pagination from '../../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { login, logout } from '../../store/slices/Userslice';
import AlumniForm from './AluminiForm/AluminiForm';

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

const AlumniPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const alumniPerPage = 3;

  const alumniList = useSelector((state: RootState) => state.alumni.alumni);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const filteredAlumni = alumniList.filter((alumnus) =>
    alumnus.skills.some((skill) => skill.toLowerCase().includes(searchSkill.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstAlumni, indexOfLastAlumni);

  return (
    <div className="alumni-page-container">
      <header className="alumni-page-header">
        <h1 className="alumni-page-title">Meet Our Alumni</h1>
        {/* Mock login buttons for testing */}
        {!currentUser ? (
          <div className="auth-buttons">
            <button onClick={() => dispatch(login({ id: 1, username: 'admin', role: 'admin' }))}>
              Login as Admin (Super User)
            </button>
            <button onClick={() => dispatch(login({ id: 2, username: 'user', role: 'user' }))}>
              Login as User
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <span>Welcome, {currentUser.username} ({currentUser.role})</span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        )}
        {currentUser && (
          <button className="create-alumni-button" onClick={() => setShowModal(true)}>
            Add New Alumni
          </button>
        )}
      </header>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-button" onClick={() => setShowModal(false)}>
              ×
            </button>
            <AlumniForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by skill..."
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
        />
      </div>

      <div className="alumni-grid">
        {currentAlumni.map((alumnus, index) => (
          <div key={alumnus.id} className="alumni-card" style={{ animationDelay: `${index * 0.1}s` }}>
            {alumnus.photo && <img src={alumnus.photo} alt={alumnus.name} className="alumni-image" />}
            <div className="alumni-info">
              <h2 className="alumni-name">{alumnus.name}</h2>
              <span className="alumni-university">{alumnus.university}</span>
              <span className="alumni-graduation-year">Class of {alumnus.graduationYear}</span>
              <p className="alumni-bio">{alumnus.bio}</p>
              <div className="alumni-skills">
                {alumnus.skills.map((skill) => (
                  <span key={skill} className="alumni-skill">{skill}</span>
                ))}
              </div>
              <Link to={`/alumni/${alumnus.id}`} className="read-more-button">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-wrapper">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          yDistance={400}
        />
      </div>
    </div>
  );
};

export default AlumniPage;