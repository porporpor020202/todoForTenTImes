import dynamic from 'next/dynamic';

const TodoApp = dynamic(() => import('@/app/components/TodoApp'), {
  ssr: false,
});

export default TodoApp;
