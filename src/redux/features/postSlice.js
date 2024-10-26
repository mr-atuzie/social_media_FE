import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/post/" + postId);
      // const comments = await axios.get("/api/v1/post/comment/" + postId);
      // return { post: response.data, comments: comments.data.comments };
      return response.data;
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

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/post/comment/" + postId);

      return response.data.comments; // Assuming your API returns the data directly
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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/post/like/" + postId);

      return response.data.post; // Assuming your API returns the data directly
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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.delete("/api/v1/post/delete/" + postId);

      return response.data; // Assuming your API returns the data directly
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
  post: null,
  comments: [],
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
    //get all post
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        toast.error(action.payload);
      })
      //get all user post
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.posts = action.payload; // Load the fetched posts into the state
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        toast.error(action.payload);
      })
      //get single post
      .addCase(fetchSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.post = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        toast.error(action.payload);
      })
      //get post comments
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        toast.error(action.payload);
      })
      //like post
      .addCase(likePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.post = action.payload;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        toast.error(action.payload);
      })
      //delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.posts = action.payload;
        // state.post = action.payload;
        console.log(action.payload);

        toast.success("Post has been deleted");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        toast.error(action.payload);
      });
  },
});

export const { SET_POSTS } = postSlice.actions;

export const selectPosts = (state) => state.post.posts;
export const selectPost = (state) => state.post.post;
export const selectComents = (state) => state.post.comments;
export const selectPostLoader = (state) => state.post.isLoading;

export default postSlice.reducer;
