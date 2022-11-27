import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { fetchTodos } from '../../store/todo';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectCompletedTodo, selectIncompletedTodo } from '../../store/todo/selectors';

function Todos() {
  const completedTodo = useAppSelector((state) => selectCompletedTodo(state));
  const incompletedTodo = useAppSelector((state) => selectIncompletedTodo(state));

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, []);

  const taskStatus = {
    inProgress: {
      name: 'In Progress',
      items: incompletedTodo,
    },
    done: {
      name: 'Completed',
      items: completedTodo,
    },
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const [columns, setColumns] = useState(taskStatus);
  return (
    <div className='px-5 py-2'>
      <h1 style={{ textAlign: 'center', borderBottom: 'solid 2px #4682B4' }}>Todos</h1>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item?.id} draggableId={String(item?.id)} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                color: 'white',
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item?.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Todos;
