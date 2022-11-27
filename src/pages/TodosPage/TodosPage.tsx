import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchTodos } from '../../store/todo';
import Todos from '../../components/Todos/Todos';

function TodosPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return <Todos />;
}

export default TodosPage;
