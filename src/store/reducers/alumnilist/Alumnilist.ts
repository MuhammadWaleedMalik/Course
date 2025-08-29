import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface AlumniState {
  alumni: Alumni[];
  loading: boolean;
  error: string | null;
}

const initialAlumni: Omit<Alumni, 'authorId'>[] = [
  {
    id: 1,
    name: 'John Doe',
    bio: 'John is a software engineer with expertise in full-stack development. He graduated with honors and is passionate about mentoring new graduates.',
    graduationYear: '2020',
    skills: ['JavaScript', 'React', 'Engineer'],
    photo: 'https://placehold.co/600x400?text=John+Doe',
    university: 'Harvard University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Jane is a data scientist specializing in machine learning. She has contributed to several open-source projects and enjoys teaching.',
    graduationYear: '2018',
    skills: ['Python', 'Machine Learning', 'Scientist'],
    photo: 'https://placehold.co/600x400?text=Jane+Smith',
    university: 'Stanford University',
  },
];

const initialState: AlumniState = {
  alumni: initialAlumni.map((alumnus, index) => ({
    ...alumnus,
    authorId: (index % 2) + 1, // Alternate between authorId 1 (admin) and 2 (user) for demo
  })),
  loading: false,
  error: null,
};

const alumniSlice = createSlice({
  name: 'alumni',
  initialState,
  reducers: {
    addAlumni(state, action: PayloadAction<Alumni>) {
      state.alumni.push(action.payload);
    },
    updateAlumni(state, action: PayloadAction<Alumni>) {
      const index = state.alumni.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.alumni[index] = action.payload;
      }
    },
    deleteAlumni(state, action: PayloadAction<number>) {
      state.alumni = state.alumni.filter((a) => a.id !== action.payload);
    },
    updateloader(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateerror(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addAlumni, updateAlumni, deleteAlumni, updateloader, updateerror } = alumniSlice.actions;
export default alumniSlice.reducer;