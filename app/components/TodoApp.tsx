'use client';

import { useEffect, useState } from 'react';

import DropDown from '@/app/components/DropDown';
import Form from '@/app/components/Form';
import Lists from '@/app/components/Lists';
import { FilterType, TodoType } from '@/app/types/types';

const initialTodos = [
  { id: Date.now(), content: '리액트 공부하기', completed: false },
  { id: Date.now() + 1, content: '청소하기', completed: true },
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
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortByDate, setSortByDate] = useState(false);

  const filterMap = {
    all: () => true,
    completed: (todo: TodoType) => todo.completed,
    incompleted: (todo: TodoType) => !todo.completed,
  };

  const handleFilterChange = (value: FilterType) => {
    if (value === filter) {
      setFilter('all');
      return;
    }

    setFilter(value);
  };

  const filteredTodos = todos.filter(filterMap[filter]);

  const sortedAndFilteredTodos = [...filteredTodos].sort((a, b) => {
    if (sortByDate) {
      return a.id - b.id;
    }
    return 0;
  });

  const handleDeleteAll = () => {
    localStorage.removeItem('todos');
    setTodos([]);
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-y-auto bg-blue-200 p-20">
      <div className="w-3/4 max-w-lg rounded-lg bg-white p-4 text-gray-800 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-2">
              <h2>완료 항목만 </h2>
              <input
                type="checkbox"
                checked={filter === 'completed'}
                onChange={() => handleFilterChange('completed')}
              />
            </div>

            <div className="flex gap-2">
              <h2>미완 항목만 </h2>
              <input
                type="checkbox"
                checked={filter === 'incompleted'}
                onChange={() => handleFilterChange('incompleted')}
              />
            </div>
          </div>

          <div className="">
            <div className="flex flex-col items-center justify-end rounded-md bg-gray-100 p-4">
              <h2>정렬 기준</h2>
              <ul>
                <li className="flex justify-end gap-2">
                  <h3>날짜 순</h3>
                  <input
                    type="checkbox"
                    checked={sortByDate}
                    onChange={() => setSortByDate(!sortByDate)}
                  />
                </li>
              </ul>
            </div>
            <button onClick={handleDeleteAll}>Delete All</button>
          </div>
        </div>
        <Lists
          todos={sortedAndFilteredTodos}
          setTodos={setTodos}
          isDndDisabled={filter !== 'all' || sortByDate}
        />
        <Form todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};
export default TodoApp;
