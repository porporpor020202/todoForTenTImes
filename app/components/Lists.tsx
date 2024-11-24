import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

import { Todo } from '../types/type';
import List from './List';

const Lists = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const newTodos = [...todos];
    newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, todos[source.index]);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <List
                      key={todo.id}
                      id={todo.id}
                      content={todo.content}
                      completed={todo.completed}
                      todos={todos}
                      setTodos={setTodos}
                      snapshot={snapshot}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Lists;
