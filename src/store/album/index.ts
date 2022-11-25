// import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectAlbumIds } from './selectors';

export const fetchAlbums = createAsyncThunk('album/fetchAlbums', async (_, thunkAPI) => {
  if (selectAlbumIds(thunkAPI.getState() as RootState).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  return response.json();
});

interface AlbumState {
  id: number;
  userId: number;
  title: string;
  photos: [];
}

const albumEntityAdapter = createEntityAdapter<AlbumState>();

export const albumSlice = createSlice({
  name: 'album',
  initialState: albumEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        albumEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      }),
});
