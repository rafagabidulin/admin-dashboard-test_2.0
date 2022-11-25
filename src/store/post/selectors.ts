// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

export const selectPostModuleState = (state: RootState) => state.post;

export const selectPostIds = (state: RootState) => selectPostModuleState(state).ids;

export const selectPostEntities = (state: RootState) => selectPostModuleState(state).entities;

export const selectPostById = (state: RootState, { postId }: { postId: string }) =>
  selectPostEntities(state)[postId];
