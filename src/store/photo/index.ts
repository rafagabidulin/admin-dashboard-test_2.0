// import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectPhotoIds } from './selectors';

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async ({ albumId }, thunkAPI) => {
  //   const albumPhotoIds = selectAlbumPhotosById(thunkAPI.getState(), {
  //     albumId,
  //   });

  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${albumId}`);
  return response.json();
});

interface PhotoState {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const photoEntityAdapter = createEntityAdapter<PhotoState>();

export const photoSlice = createSlice({
  name: 'photo',
  initialState: photoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        photoEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      }),
});
