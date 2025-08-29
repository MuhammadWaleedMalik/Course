import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.scss';
import Pagination from '../../components/Pagination/Pagination';
import BlogForm from './BlogForm/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { login , logout } from '../../store/slices/Userslice';
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: string | null;
  date: string;
  authorId: number;
}

const BlogPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 3;

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="blog-page-container">
      <header className="blog-page-header">
        <h1 className="blog-page-title">Explore Our Blogs</h1>
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
          <button className="create-blog-button" onClick={() => setShowModal(true)}>
            Create New Blog
          </button>
        )}
      </header>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-button" onClick={() => setShowModal(false)}>
              ×
            </button>
            <BlogForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <div className="blog-grid">
        {currentBlogs.map((blog, index) => (
          <div key={blog.id} className="blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
            {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
            <div className="blog-info">
              <h2 className="blog-title">{blog.title}</h2>
              <span className="blog-date">{blog.date}</span>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <div className="blog-tags">
                {blog.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <Link to={`/blog/${blog.id}`} className="read-more-button">
                Read More
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

export default BlogPage;