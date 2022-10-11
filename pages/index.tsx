import type {NextPage} from 'next';
import Head from 'next/head';
import TodoItem from '../components/TodoItem';
import {TodoProps} from '../components/TodoItem';
import {CategoryProps} from '../components/CategoryItem';
import {useState} from 'react';
import Filter from '../components/Filter';
import useAllTodos from '../utils/hooks/useAllTodos';
import useAllCategories from '../utils/hooks/useAllCategories';
import {FilterParams} from '../components/Filter';
import Display from '../components/Display';
import {DisplayType} from '../components/Display';
import CategoryItem from '../components/CategoryItem';
import {Todo, Category} from '@prisma/client';
import EditTodoModal from '../components/modals/EditTodoModal';
import EditCategoryModal from '../components/modals/EditCategoryModal';
import AddTodoModal from '../components/modals/AddTodoModal';
import AddCategoryModal from '../components/modals/AddCategoryModal';

type modalType = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null;

const Home: NextPage = () => {
  const [displayList, setDisplayList] = useState<DisplayType>('Todos');
  const [filterOptions, setFilterOptions] = useState<FilterParams>({byDate: 'Desc', byCategory: ''});
  const [todoEditId, setTodoEditId] = useState<number>(-1);
  const [categoryEditId, setCategoryEditId] = useState<number>(-1);
  const [openModal, setOpenModal] = useState<modalType>(null);

  const todos = useAllTodos();
  const categories = useAllCategories();

  if (todos.isLoading || categories.isLoading) {
    return (
      <div className='h-screen w-screen bg-slate-600 flex flex-col items-center justify-center'>
        <h2 className='text-4xl font-extrabold text-white text-center'>Loading...</h2>
      </div>
    );
  }

  if (todos.error || categories.error) {
    return (
      <div className={`${openModal ? 'overflow-hidden' : ''} h-screen w-screen bg-slate-600 flex flex-col items-center justify-center`}>
        <h2 className='text-4xl font-extrabold text-white text-center'>Error</h2>
      </div>
    );
  }

  const handleFilter = (filter: FilterParams) => {
    setFilterOptions(filter);
    console.log(sortTodos(todos.data));
  };

  const handleTodoEdit = (id: number) => {
    setTodoEditId(id);
    setOpenModal('Edit Todo');
  };

  const handleCategoryEdit = (id: number) => {
    setCategoryEditId(id);
    setOpenModal('Edit Category');
  };

  const getTodoById = (id: number, ts: Todo[]) => {
    return ts.filter((t: Todo) => t.id === id)[0];
  };

  const getCategoryById = (id: number, cs: Category[]) => {
    return cs.filter((c: Category) => c.id === id)[0];
  };

  const sortTodos = (todos: Todo[]) => {
    const {byDate, byCategory} = filterOptions;
  };

  //TODO: solve the filter problem
  return (
    <div className='h-screen w-screen bg-slate-600 flex flex-col px-4 sm:px-10 md:px-20 lg:px-32 xl:px-60 pt-6 pb-9'>
      <Head>
        <title>Todo App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='px-8 py-10 text-white text-center'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide'>Todo App</h1>
      </div>
      <div className='text-white text-center p-2 pb-10'>
        <p className='text-xl md:text-2xl font-bold'>Simple Todo App</p>
      </div>
      <Display displaying={(display: DisplayType) => setDisplayList(display)} />
      <div className='overflow-auto scroll-smooth my-4'>
        {displayList === 'Todos'
          ? todos.data.map((todo: TodoProps) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                name={todo.name}
                description={todo.description}
                priority={todo.priority}
                deadline={todo.deadline}
                createdAt={todo.createdAt}
                updatedAt={todo.updatedAt}
                categories={todo.categories}
                handleEdit={handleTodoEdit}
              />
            ))
          : categories.data.map((category: CategoryProps) => (
              <CategoryItem
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                createdAt={category.createdAt}
                updatedAt={category.updatedAt}
                todos={category.todos}
                handleEdit={handleCategoryEdit}
              />
            ))}
      </div>
      {openModal === 'Edit Todo' && (
        <EditTodoModal
          payload={{categories: categories.data, defaultTodo: getTodoById(todoEditId, todos.data), closeForm: () => setOpenModal(null)}}
        />
      )}
      {openModal === 'Edit Category' && (
        <EditCategoryModal
          payload={{todos: todos.data, defaultCategory: getCategoryById(categoryEditId, categories.data), closeForm: () => setOpenModal(null)}}
        />
      )}
      <button
        className='bg-rose-500 hover:bg-rose-600 text-white text-lg rounded-md shadow-lg my-2 p-2'
        onClick={() => {
          setOpenModal('Add Todo');
        }}
      >
        Add Todo
      </button>
      {openModal === 'Add Todo' && <AddTodoModal payload={{categories: categories.data, closeForm: () => setOpenModal(null)}} />}
      <button className='bg-rose-500 hover:bg-rose-600 text-white text-lg rounded-md shadow-lg p-2' onClick={() => setOpenModal('Add Category')}>
        Add Category
      </button>
      {openModal === 'Add Category' && <AddCategoryModal payload={{todos: todos.data, closeForm: () => setOpenModal(null)}} />}
    </div>
  );
};

export default Home;

