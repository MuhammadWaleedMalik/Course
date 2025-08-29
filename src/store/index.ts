import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/bloglist/Bloglist';
import alumniReducer from './reducers/alumnilist/Alumnilist';
import userReducer from './slices/Userslice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    alumni: alumniReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;