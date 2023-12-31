import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the post slice
const initialState = {
  posts: [],
  loading: false,
  error: '',
}

// Async thunk for getting all posts
export const fetchPosts = createAsyncThunk('post/fetchPosts', () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts").then(response => response.data)
});

// Async thunk for deleting a post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return postId;
});

// Async thunk for creating a post
export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
  return response.data;
});

// Async thunk for updating a post
export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  return response.data;
});

// Create post slice
const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    // Reducer for handling the pending state of fetchPosts
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true
    })
    // Reducer for handling the fulfilled state of fetchPosts
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload
      state.error = ''
    })
    // Reducer for handling the fulfilled state of deletePost
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    })
    // Reducer for handling the pending state of createPost
    .addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    // Reducer for handling the fulfilled state of createPost
    .addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload); // Add the new post at the beginning of the array
    })
    // Reducer for handling the rejected state of createPost
    .addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    // Reducer for handling the pending state of updatePost
    .addCase(updatePost.pending, state => {
      state.loading = true;
    })
    // Reducer for handling the fulfilled state of updatePost
    .addCase(updatePost.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
        );
      return {
        ...state,
        posts: updatedPosts,
        loading: false,
        error: ''
      };
    });
  }
})

export default postSlice.reducer;