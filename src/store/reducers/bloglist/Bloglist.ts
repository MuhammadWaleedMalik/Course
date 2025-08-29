// src/store/reducers/bloglist/Bloglist.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface BlogState {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
}

const initialBlogs: Omit<BlogPost, 'authorId'>[] = [
  {
    id: 1,
    title: 'Blog Post 1',
    excerpt: 'This is a short excerpt for blog post 1.',
    content: 'Full content for blog post 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['tag1', 'tag2'],
    image: 'https://placehold.co/600x400?text=Blog+1',
    date: 'August 15, 2025',
  },
  {
    id: 2,
    title: 'Blog Post 2',
    excerpt: 'This is a short excerpt for blog post 2.',
    content: 'Full content for blog post 2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['tag3', 'tag4'],
    image: 'https://placehold.co/600x400?text=Blog+2',
    date: 'August 14, 2025',
  }
  
];

const initialState: BlogState = {
  blogs: initialBlogs.map((blog, index) => ({
    ...blog,
    authorId: (index % 2) + 1, // Alternate between authorId 1 (admin) and 2 (user) for demo
  })),
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    updatedata(state, action: PayloadAction<BlogPost>) {
      state.blogs.push(action.payload);
    },
    updateBlog(state, action: PayloadAction<BlogPost>) {
      const index = state.blogs.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    deleteBlog(state, action: PayloadAction<number>) {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
    },
    updateloader(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateerror(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { updatedata, updateBlog, deleteBlog, updateloader, updateerror } = blogSlice.actions;
export default blogSlice.reducer;