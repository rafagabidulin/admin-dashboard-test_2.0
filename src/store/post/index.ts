// import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectPostIds } from './selectors';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (_, thunkAPI) => {
  if (selectPostIds(thunkAPI.getState() as RootState).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

interface PostState {
  posts: [];
  post?: [];
  id: string;
  status: string;
  title: string;
  body: string;
}

const PostEntityAdapter = createEntityAdapter<PostState>();

export const postSlice = createSlice({
  name: 'post',
  initialState: PostEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        PostEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      }),
});
