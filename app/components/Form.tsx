import { Dispatch, SetStateAction, useState } from 'react';

import { TodoType } from '../types/todo';

const Form = ({
  setTodos,
}: {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      content,
      completed: false,
    };
    setTodos((prev) => {
      const newTodos = [...prev, newTodo];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setContent('');
      return newTodos;
    });
  };

  return (
    <div className="flex items-center gap-4">
      <form
        className="flex-1 rounded border shadow"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          placeholder="해야 할 일을 입력하세요"
          className="w-full appearance-none px-3 py-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      <button>입력</button>
    </div>
  );
};
export default Form;
