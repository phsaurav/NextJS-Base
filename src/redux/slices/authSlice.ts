import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  token: null,
  user_info: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isSignedIn = true;
      state.token = payload.token;
      state.user_info = payload.user_info;
    },
    userInfoUpdate: (state, { payload }) => {
      state.user_info = payload;
    },

    setToken: (state, { payload }) => {
      state.token = payload;
    },

    logoutAction: () => initialState,
  },
});

export const {
  login,
  userInfoUpdate,
  setToken,
  logoutAction,
} = authSlice.actions;

export default authSlice.reducer;
