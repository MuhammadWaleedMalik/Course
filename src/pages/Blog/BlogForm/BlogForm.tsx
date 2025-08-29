// src/pages/Blog/BlogForm.tsx
import React, { useState, useEffect } from 'react';
import './BlogForm.scss';
import Btn1 from '../../../components/Buttons/BTN1/Btn1';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { updatedata, updateBlog, updateloader, updateerror } from '../../../store/reducers/bloglist/Bloglist';

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

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: File | string | null;
}

interface BlogFormProps {
  onSuccess?: () => void;
  existingBlog?: BlogPost;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSuccess, existingBlog }) => {
  const isEdit = !!existingBlog;
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    image: null,
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [errors, setErrors] = useState<Partial<BlogFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        tags: existingBlog.tags.slice(),
        image: existingBlog.image,
      });
    }
  }, [existingBlog]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BlogFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (formData.tags.length === 0) newErrors.tags = ['At least one tag is required'];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
        setTagInput('');
        setErrors((prev) => ({ ...prev, tags: undefined }));
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isEdit && !currentUser) {
      setSuccessMessage('Please log in to create a blog post.');
      return;
    }

    setIsSubmitting(true);
    dispatch(updateloader(true));
    setSuccessMessage('');

    try {
      let imageUrl: string | null = null;
      if (formData.image instanceof File) {
        imageUrl = URL.createObjectURL(formData.image);
      } else {
        imageUrl = formData.image as string | null;
      }

      const blogData: BlogPost = {
        id: isEdit ? existingBlog!.id : Date.now(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags,
        image: imageUrl,
        date: isEdit ? existingBlog!.date : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        authorId: isEdit ? existingBlog!.authorId : currentUser!.id,
      };

      if (isEdit) {
        dispatch(updateBlog(blogData));
      } else {
        dispatch(updatedata(blogData));
      }

      setSuccessMessage(`Blog post ${isEdit ? 'updated' : 'created'} successfully!`);
      if (!isEdit) {
        setFormData({ title: '', excerpt: '', content: '', tags: [], image: null });
        setTagInput('');
      }
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 300);
    } catch (error) {
      console.error('Submission error:', error);
      dispatch(updateerror('Error processing blog post. Please try again.'));
      setSuccessMessage('Error processing blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
      dispatch(updateloader(false));
    }
  };

  return (
    <div className="blog-form-container">
      <h1 className="blog-form-title">{isEdit ? 'Edit' : 'Create'} a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <span id="title-error" className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter a short excerpt"
            rows={3}
            aria-invalid={!!errors.excerpt}
            aria-describedby={errors.excerpt ? 'excerpt-error' : undefined}
          />
          {errors.excerpt && <span id="excerpt-error" className="error">{errors.excerpt}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here (Markdown supported)"
            rows={10}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? 'content-error' : undefined}
          />
          {errors.content && <span id="content-error" className="error">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Featured Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && typeof formData.image === 'string' && (
            <span className="file-name">Current: {formData.image}</span>
          )}
          {formData.image && formData.image instanceof File && (
            <span className="file-name">{formData.image.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
            placeholder="Add tags (press Enter or comma)"
            aria-describedby="tags-help"
          />
          <div id="tags-help" className="tags-help">Press Enter or comma to add a tag.</div>
          <div className="tags-list">
            {formData.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
          {errors.tags && <span className="error">{errors.tags}</span>}
        </div>

        <Btn1
          defaultText={isSubmitting ? 'Submitting...' : isEdit ? 'Update Blog Post' : 'Create Blog Post'}
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

export default BlogForm;