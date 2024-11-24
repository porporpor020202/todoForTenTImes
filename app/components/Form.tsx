import { Dispatch, SetStateAction, useState } from 'react';

import { Todo } from '../types/type';

const Form = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    const newTodos = [
      ...todos,
      { id: Date.now(), content: value, completed: false },
    ];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setValue('');
  };

  return (
    <div className="flex w-full">
      <form className="mr-4 flex w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 rounded-md p-3 shadow"
          placeholder="해야 할 일을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <button className="mr-4" onClick={() => handleSubmit()}>
        Add
      </button>
    </div>
  );
};
export default Form;
