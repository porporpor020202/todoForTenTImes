import { DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import { TodoType } from '@/app/types/todo';

const List = ({
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const handleToggle = () => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleDelete = () => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, content: editedContent } : todo,
      );
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return isEditing ? (
    <div
      className={`my-2 flex items-center justify-between rounded-md border px-4 py-1 text-gray-600 ${
        snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100'
      }`}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="w-full px-3 py-2 text-gray-500"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          autoFocus
        />
      </form>
      <div className="mr-4 flex items-center gap-8">
        <button onClick={handleEdit}>save</button>
        <button onClick={handleDelete}>x</button>
      </div>
    </div>
  ) : (
    <div
      className={`my-2 flex items-center justify-between rounded-md border px-4 py-3 text-gray-600 ${
        snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100'
      }`}
    >
      <input type="checkbox" checked={completed} onChange={handleToggle} />
      <div className={`${completed ? 'line-through' : null} flex-1`}>
        {content}
      </div>
      <div className="mr-4 flex items-center gap-8">
        <button onClick={handleEdit}>edit</button>
        <button onClick={handleDelete}>x</button>
      </div>
    </div>
  );
};
export default List;
