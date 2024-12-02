'use client';

import { useState } from 'react';

import Form from '@/app/components/Form';
import Lists from '@/app/components/Lists';
import { TodoType } from '@/app/types/types';

const initialTodos = [
  { id: 1, content: '리액트 공부하기', completed: false },
  { id: 2, content: '청소하기', completed: true },
];

const initialSavedTodos = () => {
  const savedTodo = JSON.parse(
    localStorage.getItem('todos') || JSON.stringify(initialTodos),
  );

  if (savedTodo.length === 0) {
    return initialTodos;
  }

  return savedTodo;
};

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoType[]>(initialSavedTodos);

  const handleDeleteAll = () => {
    localStorage.removeItem('todos');
    setTodos([]);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-200">
      <div className="w-3/4 max-w-lg rounded-lg bg-white p-4 text-gray-800 shadow-lg">
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
