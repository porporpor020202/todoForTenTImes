import { DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction, useState } from 'react';

import { TodoType } from '../types/types';
import { cn } from '../utils/utils';

const List = ({
  todos,
  setTodos,
  id,
  content,
  completed,
  snapshot,
}: {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  id: TodoType['id'];
  content: TodoType['content'];
  completed: TodoType['completed'];
  snapshot: DraggableStateSnapshot;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleEditButton = () => {
    setIsEditting((prev) => !prev);

    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: editContent };
      }
      return todo;
    });

    setTodos(newTodo);
    localStorage.setItem('todos', JSON.stringify(newTodo));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: editContent };
      }
      return todo;
    });

    setIsEditting((prev) => !prev);
    setTodos(newTodo);
    localStorage.setItem('todos', JSON.stringify(newTodo));
  };

  const handleCompleteTogle = () => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !completed };
      }
      return todo;
    });

    setTodos(newTodo);
    localStorage.setItem('todos', JSON.stringify(newTodo));
  };

  const handleDeleteButton = () => {
    const newTodo = todos.filter((todo) => todo.id !== id);

    setTodos(newTodo);
    localStorage.setItem('todos', JSON.stringify(newTodo));
  };

  return isEditting ? (
    <div>
      <div
        className={cn(
          'my-2 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2 shadow',
          snapshot.isDragging && 'bg-blue-200',
        )}
      >
        <form onSubmit={(e) => handleSubmit(e)} className="h-10 flex-1">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="h-full w-3/4 rounded-md p-2 shadow-sm"
            autoFocus
          />
        </form>
        <div className="mr-6 flex gap-4">
          <button onClick={handleEditButton}>save</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'my-2 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow',
        snapshot.isDragging && 'bg-blue-200',
      )}
    >
      <input
        type="checkbox"
        checked={completed}
        className="mr-2"
        onChange={handleCompleteTogle}
      />
      <div className="mr-4 flex-1">{content}</div>
      <div className="mr-6 flex gap-4">
        <button onClick={handleEditButton}>edit</button>
        <button onClick={handleDeleteButton}>delete</button>
      </div>
    </div>
  );
};
export default List;
