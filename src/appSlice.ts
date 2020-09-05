import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  username: '',
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setAppState: (_, action: PayloadAction<typeof initialState>) => {
      return action.payload;
    },
  },
});
