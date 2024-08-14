import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    SET_POST(state, action) {
      state.post = action.payload;
    },
  },
});

export const { SET_POST } = postSlice.actions;

export const selectPosts = (state) => state.post.posts;

export default postSlice.reducer;
