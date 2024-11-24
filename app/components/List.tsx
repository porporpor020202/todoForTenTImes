import { DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction, useState } from 'react';

import { Todo } from '../types/type';

const List = ({
  id,
  content,
  completed,
  todos,
  setTodos,
  snapshot,
}: Todo & {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  snapshot: DraggableStateSnapshot;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleTogle = () => {
    const newTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !completed } : todo,
    );

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleOnSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    const newTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, content: editContent } : todo,
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    const newTodos = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return isEditing ? (
    <div
      className={`my-2 flex items-center justify-between rounded-md ${
        snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100'
      } text-gray-500`}
    >
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          value={editContent}
          className="my-1 ml-2 rounded-lg p-3"
          onChange={(e) => setEditContent(e.target.value)}
        />
      </form>
      <div className="mr-6 flex items-center gap-4">
        <button onClick={() => handleOnSubmit()}>save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  ) : (
    <div
      className={`my-2 flex items-center justify-between rounded-md ${
        snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100'
      } p-4 text-gray-500`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={handleTogle}
        className="mr-2"
      />
      <span className="flex-1">{content}</span>
      <div className="mr-6 flex items-center gap-4">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
export default List;
