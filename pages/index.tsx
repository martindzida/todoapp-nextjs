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
import DisplaySetting from '../components/DisplaySetting';
import {DisplayType} from '../components/DisplaySetting';
import CategoryItem from '../components/CategoryItem';
import {Todo, Category} from '@prisma/client';
import EditTodoModal from '../components/modals/EditTodoModal';
import EditCategoryModal from '../components/modals/EditCategoryModal';
import AddTodoModal from '../components/modals/AddTodoModal';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import DisplayItems from '../components/DisplayItems';
import Header from '../components/Header';
import AddItemBtn from '../components/AddItemBtn';

export type modalType = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null;

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
  };

  const handleTodoEdit = (id: number) => {
    setTodoEditId(id);
    setOpenModal('Edit Todo');
  };

  const handleCategoryEdit = (id: number) => {
    setCategoryEditId(id);
    setOpenModal('Edit Category');
  };

  const getTodoById = (id: number, todos: Todo[]) => {
    return todos.filter((todo: Todo) => todo.id === id)[0];
  };

  const getCategoryById = (id: number, categories: Category[]) => {
    return categories.filter((category: Category) => category.id === id)[0];
  };

  //TODO: solve the filter problem
  return (
    <div className='h-screen w-screen bg-slate-600 flex flex-col px-4 sm:px-10 md:px-20 lg:px-32 xl:px-60 pt-6 pb-9'>
      <Head>
        <title>Todo App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='flex flex-row justify-between items-center bg-slate-700 text-white shadow-lg rounded-md p-3 my-2'>
        <Filter categories={categories.data} filtering={handleFilter} />
        <DisplaySetting displaying={(display: DisplayType) => setDisplayList(display)} />
      </div>
      <div className='overflow-auto scroll-smooth my-4 rounded-md'>
        {displayList === 'Todos'
          ? todos.data.map((todo: TodoProps) => <TodoItem key={todo.id} {...todo} handleEdit={handleTodoEdit} />)
          : categories.data.map((category: CategoryProps) => <CategoryItem key={category.id} {...category} handleEdit={handleCategoryEdit} />)}
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
      <AddItemBtn itemType='Add Todo' handleAdd={setOpenModal} />
      {openModal === 'Add Todo' && <AddTodoModal payload={{categories: categories.data, closeForm: () => setOpenModal(null)}} />}
      <AddItemBtn itemType='Add Category' handleAdd={setOpenModal} />
      {openModal === 'Add Category' && <AddCategoryModal payload={{todos: todos.data, closeForm: () => setOpenModal(null)}} />}
    </div>
  );
};

export default Home;

