import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for fetching posts
// export const fetchPosts = createAsyncThunk("", async () => {
//   const response = await axios.get("/api/v1/post/");
//   return response.data;
// });

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/post/"); // Replace with your API endpoint
      return response.data.posts; // Assuming your API returns the data directly
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/post/user/" + userId); // Replace with your API endpoint
      return response.data.posts; // Assuming your API returns the data directly
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  posts: [],
  isLoading: false,
  isError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    SET_POSTS(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get all
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.posts = action.payload; // Load the fetched posts into the state

        console.log({ from: "postSlice", posts: action.payload });
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get all user post
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.posts = action.payload; // Load the fetched posts into the state

        console.log({ from: "postUserSlice", posts: action.payload });
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { SET_POSTS } = postSlice.actions;

export const selectPosts = (state) => state.post.posts;
export const selectPostLoader = (state) => state.post.isLoading;

export default postSlice.reducer;
