import { RootState } from '..';

export const selectCommentModuleState = (state: RootState) => state.comment;

export const selectCommentIds = (state: RootState) => selectCommentModuleState(state).ids;

export const selectCommentEntities = (state: RootState) => selectCommentModuleState(state).entities;

export const selectCommentArrayEntities = (state: RootState) =>
  Object.values(selectCommentEntities(state));

export const selectCommentById = (state: RootState, { commentId }: { commentId: number }) =>
  selectCommentEntities(state)[commentId];

export const selectCommentsByPostId = (state: RootState, { postId }: { postId: number }) =>
  selectCommentEntities(state)[postId];

export const selectCommentByPostId = (state: RootState, { postId }: { postId: string }) =>
  selectCommentArrayEntities(state).filter((comment) => comment?.postId === parseInt(postId, 10));
