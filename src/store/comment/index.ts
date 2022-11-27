import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectCommentIds } from './selectors';

export const fetchComments = createAsyncThunk('comment/fetchComments', async (postId, thunkAPI) => {
  // if (Object.values(selectCommentIds(thunkAPI.getState() as RootState)).length > 0) {
  //   return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  // }

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );

  return response.data;
});

interface CommentState {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const commentEntityAdapter = createEntityAdapter<CommentState>();

export const commentSlice = createSlice({
  name: 'comment',
  initialState: commentEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        commentEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      }),
});
