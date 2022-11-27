import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectUserTodosById } from '../user/selectors';
import { selectTodoIds } from './selectors';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_, thunkAPI) => {
  // const userTodosIds = selectUserTodosById(thunkAPI.getState(), {
  //   userId,
  // });
  // const todoIds = selectTodoIds(thunkAPI.getState());

  // if (userTodosIds?.every((id) => todoIds.includes(id))) {
  //   return;
  // }

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
