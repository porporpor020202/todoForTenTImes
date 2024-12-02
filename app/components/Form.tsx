import { Dispatch, SetStateAction, useState } from 'react';

import { TodoType } from '@/app/types/types';

const Form = ({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const newTodo = {
      id: Date.now(),
      content: title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <form
        className="flex-1 items-center gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Add a new todo"
          className="w-full rounded-md p-2 shadow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <button
        onClick={() => handleSubmit()}
        className="flex items-center justify-center"
      >
        <p>Add</p>
      </button>
    </div>
  );
};
export default Form;
