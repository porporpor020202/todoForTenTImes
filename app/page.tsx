import dynamic from 'next/dynamic';

const TodoApp = dynamic(() => import('./components/TodoApp'), {
  ssr: false,
});

const page = () => {
  return <TodoApp />;
};
export default page;
