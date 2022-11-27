import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectTodoIds } from './selectors';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_, thunkAPI) => {
  if (selectTodoIds(thunkAPI.getState() as RootState).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);

  return response.data;
});

interface TodoState {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todoEntityAdapter = createEntityAdapter<TodoState>();

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        todoEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      }),
});
