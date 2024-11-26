import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';

import { TodoType } from '../types/types';

const Form = ({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      content: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');

    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <form className="flex-1" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full rounded-md p-2 shadow-sm"
          autoFocus
        />
      </form>
      <div className="ml-2 flex items-center justify-center">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => handleSubmit()}
        >
          Add
        </button>
      </div>
    </div>
  );
};
export default Form;
