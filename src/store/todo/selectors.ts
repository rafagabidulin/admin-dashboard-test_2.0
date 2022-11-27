import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';

export const selectTodoModuleState = (state: RootState) => state.todo;

export const selectTodoIds = (state: RootState) => selectTodoModuleState(state).ids;

export const selectTodoEntities = (state: RootState) => selectTodoModuleState(state).entities;

export const selectTodoArrayEntities = (state: RootState) =>
  Object.values(selectTodoEntities(state));

// export const selectTodoById = (state: RootState, { userId }: { userId: string }) =>
//   selectTodoArrayEntities(state).filter((todo) => todo?.userId === parseInt(userId, 10));

export const selectTodoById = (state: RootState, { todoId }: { todoId: number }) =>
  selectTodoEntities(state)[todoId];

export const selectCompletedTodo = (state: RootState) =>
  selectTodoArrayEntities(state).filter((todo) => todo?.completed);

export const selectIncompletedTodo = (state: RootState) =>
  selectTodoArrayEntities(state).filter((todo) => !todo?.completed);

export const selectTodosLoadingStatus = (state: RootState) => selectTodoModuleState(state).status;

export const selectIsTodosLoading = (state: RootState) =>
  selectTodosLoadingStatus(state) === LoadingStatuses.inProgress;
