
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    role: null,
    user:{}
};

const authSlice = createSlice({
    name: "auth",
  initialState,
  reducers: {
      login(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.user= {};
    },
},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state) {
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
