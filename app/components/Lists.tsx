import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

import List from './List';

import { TodoType } from '@/app/types/todo';

const Lists = ({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const newTodos = Array.from(todos);
    newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, todos[source.index]);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div
            className={`mb-4 mt-3`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
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
                      todos={todos}
                      setTodos={setTodos}
                      id={todo.id}
                      content={todo.content}
                      completed={todo.completed}
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
