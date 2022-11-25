import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middlewares/logger';
import { postSlice } from './post';
import { albumSlice } from './album';
import { photoSlice } from './photo';

const rootReducer = combineReducers({
  post: postSlice.reducer,
  album: albumSlice.reducer,
  photo: photoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([loggerMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
