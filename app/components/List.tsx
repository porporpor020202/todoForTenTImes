import { DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction, useState } from 'react';

import { TodoType } from '@/app/types/types';
import { cn } from '@/app/utils/utils';

const List = ({
  id,
  title,
  completed,
  todos,
  setTodos,
  snapshot,
}: {
  todo: TodoType;
  id: TodoType['id'];
  title: TodoType['content'];
  completed: TodoType['completed'];
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  snapshot: DraggableStateSnapshot;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleCompleted = () => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !completed } : todo,
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsEditing(false);

    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: newTitle } : todo,
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleDelete = () => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <>
      {isEditing ? (
        <div
          className={cn(
            'mt-2 flex justify-between rounded-lg bg-gray-100 p-1 text-gray-400',
            snapshot.isDragging && 'bg-blue-500',
          )}
        >
          <form
            className="flex w-full items-center justify-between"
            onSubmit={handleSave}
          >
            <input
              type="text"
              value={newTitle}
              className="w-3/5 rounded-md p-3"
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
          </form>
          <div className="mr-11 flex gap-4">
            <button onClick={() => handleSave()}>Save</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'mt-2 flex justify-between rounded-lg bg-gray-100 p-4 text-gray-400',
            snapshot.isDragging && 'bg-blue-500',
          )}
        >
          <input
            type="checkbox"
            checked={completed}
            className="mr-4"
            onClick={handleCompleted}
          />
          <p className="flex-1">{title}</p>
          <div className="bg-r mr-8 flex gap-4">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
