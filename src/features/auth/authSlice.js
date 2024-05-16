import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem('id') || false,
  isLoggedIn: localStorage.getItem('id') ? true : false,
  darkMode: localStorage.getItem('mode') === 'dark' ? true : false // Check local storage for the initial mode
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem('id');
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = false;
      toast.success("You have successfully logged out");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      // Update data-theme attribute based on the mode
      document.querySelector('html').setAttribute('data-theme', state.darkMode ? "dark" : "winter");
      // Update local storage with the new mode
      localStorage.setItem('mode', state.darkMode ? 'dark' : 'winter');
    }
  },
});

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
