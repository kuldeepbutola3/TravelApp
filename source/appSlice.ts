import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  username: string;
  isloggedIn: boolean;
}

const initialState: AppState = {
  username: '',
  isloggedIn: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isloggedIn = action.payload;
    },
  },
});
