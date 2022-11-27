// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

export const selectUserModuleState = (state: RootState) => state.user;

export const selectUserIds = (state: RootState) => selectUserModuleState(state).ids;

export const selectUserEntities = (state: RootState) => selectUserModuleState(state).entities;

export const selectUserById = (state: RootState, { userId }: { userId: number }) =>
  selectUserEntities(state)[userId];

export const selectUserTodosById = (state: RootState, { userId }: { userId: number }) =>
  selectUserById(state, { userId })?.todos;
