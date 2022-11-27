import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';

export const selectAlbumModuleState = (state: RootState) => state.album;

export const selectAlbumIds = (state: RootState) => selectAlbumModuleState(state).ids;

export const selectAlbumEntities = (state: RootState) => selectAlbumModuleState(state).entities;

export const selectAlbumById = (state: RootState, { albumId }: { albumId: number }) =>
  selectAlbumEntities(state)[albumId];

export const selectAlbumPhotosById = (state: RootState, { albumId }: { albumId: number }) =>
  selectAlbumById(state, { albumId })?.photos;

export const selectAlbumLoadingStatus = (state: RootState) => selectAlbumModuleState(state).status;

export const selectIsAlbumLoading = (state: RootState) =>
  selectAlbumLoadingStatus(state) === LoadingStatuses.inProgress;
