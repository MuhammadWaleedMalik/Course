  // src/store/slices/Userslice.ts
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';

  interface User {
    id: number;
    username: string;
    role: 'user' | 'admin';
  }

  interface UserState {
    currentUser: User | null;
  }

  const initialState: UserState = {
    currentUser: null,
  };

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login(state, action: PayloadAction<User>) {
        state.currentUser = action.payload;
      },
      logout(state) {
        state.currentUser = null;
      },
    },
  });

  export const { login, logout } = userSlice.actions;
  export default userSlice.reducer;