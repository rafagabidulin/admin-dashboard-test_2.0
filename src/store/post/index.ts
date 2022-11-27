import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectPostIds } from './selectors';

interface PostState {
  posts: [];
  post?: [];
  id: string;
  status: string;
  title: string;
  body: string;
  comments: [];
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (_, thunkAPI) => {
  if (selectPostIds(thunkAPI.getState() as RootState).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({ title, body, userId = new Date() }) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId,
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ title, body, id, userId }) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
      body,
      id,
      userId,
    });
    return response.data;
  }
);

export const deletePost = createAsyncThunk('post/deletePost', async ({ postId }) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return parseInt(postId, 10);
});

const postEntityAdapter = createEntityAdapter<PostState>();

export const postSlice = createSlice({
  name: 'post',
  initialState: postEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        postEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(createPost.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        postEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        postEntityAdapter.setOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(updatePost.rejected, (state) => {
        state.status = LoadingStatuses.failed;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        postEntityAdapter.removeOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(deletePost.rejected, (state) => {
        state.status = LoadingStatuses.failed;
      }),
});
