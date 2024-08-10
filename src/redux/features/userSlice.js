import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
      if (action.payload.message === "invalid signature") {
        state.isLoggedIn = false;
      }
    },
    SET_USER(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { SET_LOGIN, SET_USER } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
