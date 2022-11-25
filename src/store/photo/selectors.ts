import { RootState } from '..';

export const selectPhotoModuleState = (state: RootState) => state.photo;

export const selectPhotoIds = (state: RootState) => selectPhotoModuleState(state).ids;

export const selectPhotoEntities = (state: RootState) => selectPhotoModuleState(state).entities;

export const selectPhotoById = (state: RootState, { photoId }: { photoId: string }) =>
  selectPhotoEntities(state)[photoId];
