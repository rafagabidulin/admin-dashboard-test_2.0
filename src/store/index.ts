import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middlewares/logger';
import { postSlice } from './post';
import { albumSlice } from './album';
import { photoSlice } from './photo';
import { commentSlice } from './comment';
import { todoSlice } from './todo';
import { userSlice } from './user';

const rootReducer = combineReducers({
  post: postSlice.reducer,
  comment: commentSlice.reducer,
  album: albumSlice.reducer,
  photo: photoSlice.reducer,
  todo: todoSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([loggerMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
