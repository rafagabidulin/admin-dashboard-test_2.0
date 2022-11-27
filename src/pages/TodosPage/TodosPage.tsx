import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchTodos } from '../../store/todo';
import { selectIsTodosLoading } from '../../store/todo/selectors';
import Todos from '../../components/Todos/Todos';

function TodosPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => selectIsTodosLoading(state));

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, []);

  // if (isLoading) {
  //   return <Spinner animation='border' />;
  // }

  return <Todos />;
}

export default TodosPage;
