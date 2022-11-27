import { RootState } from '..';

export const selectPhotoModuleState = (state: RootState) => state.photo;

export const selectPhotoIds = (state: RootState) => selectPhotoModuleState(state).ids;

export const selectPhotoEntities = (state: RootState) => selectPhotoModuleState(state).entities;

export const selectPhotoArrayEntities = (state: RootState) =>
  Object.values(selectPhotoEntities(state));

export const selectPhotoById = (state: RootState, { photoId }: { photoId: string }) =>
  selectPhotoEntities(state)[photoId];

export const selectPhotoByAlbumId = (state: RootState, { albumId }: { albumId: string }) =>
  selectPhotoArrayEntities(state).filter((photo) => photo?.albumId === parseInt(albumId, 10));

export const selectPostLoadingStatus = (state: RootState) => selectPostModuleState(state).status;

export const selectIsPostLoading = (state: RootState) =>
  selectPostLoadingStatus(state) === LoadingStatuses.inProgress;
