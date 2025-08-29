// src/pages/Blog/BlogPost.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BlogPost.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../../../store/reducers/bloglist/Bloglist';
import BlogForm from '../BlogForm/BlogForm';
import { RootState, AppDispatch } from '../../../store';

interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: string | null;
  date: string;
  authorId: number;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const selectedBlog = blogs.find((blog) => blog.id === parseInt(id || '0')) || null;

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const isAuthor = currentUser?.id === selectedBlog?.authorId;
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      if (selectedBlog) {
        dispatch(deleteBlog(selectedBlog.id));
        navigate('/blog');
      }
    }
  };

  return (
    <div className="blog-post-container">
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

      {selectedBlog ? (
        <div className="blog-post-content">
          <h1 className="blog-post-title">{selectedBlog.title}</h1>
          <span className="blog-post-date">{selectedBlog.date}</span>
          {selectedBlog.image && (
            <img src={selectedBlog.image} alt={selectedBlog.title} className="blog-post-image" />
          )}
          <div className="blog-post-tags">
            {selectedBlog.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">{tag}</span>
            ))}
          </div>
          <p className="blog-post-content-text">{selectedBlog.content}</p>

          <div className="blog-actions">
            {isAuthor && (
              <button className="edit-blog-button" onClick={() => setShowEditModal(true)}>
                Edit
              </button>
            )}
            {(isAuthor || isAdmin) && (
              <button className="delete-blog-button" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>

          <Link to="/blog" className="back-to-blogs-button">
            Back to Blogs
          </Link>
        </div>
      ) : (
        <div className="no-blog-found">
          <h2>Blog Not Found</h2>
          <Link to="/blog" className="back-to-blogs-button">
            Back to Blogs
          </Link>
        </div>
      )}

      {showEditModal && selectedBlog && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-button" onClick={() => setShowEditModal(false)}>
              ×
            </button>
            <BlogForm existingBlog={selectedBlog} onSuccess={() => setShowEditModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;