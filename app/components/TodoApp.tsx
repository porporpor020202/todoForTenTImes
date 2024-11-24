'use client';

import { useState } from 'react';

import Form from '@/app/components/Form';
import Lists from '@/app/components/Lists';

const initialTodos = [
  { id: 1, content: '할 일 1', completed: false },
  { id: 2, content: '할 일 2', completed: false },
  { id: 3, content: '할 일 3', completed: true },
];

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos === null || savedTodos === '[]') {
      localStorage.setItem('todos', JSON.stringify(initialTodos));
      return initialTodos;
    } else {
      return JSON.parse(savedTodos);
    }
  });

  const handleDeleteAll = () => {
    const newTodos: [] = [];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-100">
      <div className="mx-4 w-full max-w-lg rounded bg-white p-6 shadow md:w-3/4">
        <div className="flex items-center justify-between">
          <div>할 일 목록</div>
          <button onClick={handleDeleteAll}>Delete All</button>
        </div>
        <Lists todos={todos} setTodos={setTodos} />
        <Form setTodos={setTodos} />
      </div>
    </div>
  );
};
export default TodoApp;
