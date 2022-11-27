import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectUserIds } from './selectors';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunkAPI) => {
  //   if (selectUserIds(thunkAPI.getState() as RootState).length > 0) {
  //     return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  //   }

  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

interface UserState {
  id: number;
  name: string;
  username: string;
  email: string;
  todos: [];
}

const userEntityAdapter = createEntityAdapter<UserState>();

export const userSlice = createSlice({
  name: 'user',
  initialState: userEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        userEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      }),
});
