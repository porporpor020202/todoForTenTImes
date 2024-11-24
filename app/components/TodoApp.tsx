'use client';

import { useState } from 'react';

import Form from './Form';
import Lists from './Lists';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  });

  const handleDeleteAll = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-100">
      <div className="w-3/4 max-w-lg rounded bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <div>할 일 목록</div>
          <button onClick={handleDeleteAll}>Delete All</button>
        </div>
        <Lists todos={todos} setTodos={setTodos} />
        <Form todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};
export default TodoApp;
