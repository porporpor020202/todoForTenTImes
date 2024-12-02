import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

import List from '@/app/components/List';
import { TodoType } from '@/app/types/types';

const Lists = ({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    localStorage.setItem('todos', JSON.stringify(items));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
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
                      todo={todo}
                      id={todo.id}
                      title={todo.content}
                      completed={todo.completed}
                      todos={todos}
                      snapshot={snapshot}
                      setTodos={setTodos}
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
