import type { NextPage } from 'next'
import Head from 'next/head'
import TodoItem from '../components/TodoItem'
import { TodoProps } from '../components/TodoItem'
import { useState } from 'react'
import Filter from '../components/Filter'
import useAllTodos from '../utils/hooks/useAllTodos'
import useAllCategories from '../utils/hooks/useAllCategories'
import { FilterParams } from '../components/Filter'
import Display from '../components/Display'
import { DisplayType } from '../components/Display'
import CategoryItem from '../components/CategoryItem'
import { Todo, Category } from '@prisma/client'
import Modal from '../components/Modal'
import { modalType } from '../components/Modal'


const Home: NextPage = () => {

  const [ displayList, setDisplayList ] = useState<DisplayType>('Todos')
  const [ filterOptions, setFilterOptions ] = useState<FilterParams>()
  const [ todoEditId, setTodoEditId ] = useState<number>(-1)
  const [ categoryEditId, setCategoryEditId ] = useState<number>(-1)
  const [ openModal, setOpenModal ] = useState<modalType>(null)

  const todos = useAllTodos()
  const categories = useAllCategories()


  if (todos.isLoading || categories.isLoading) {
      return (
        <div className='h-screen w-screen bg-slate-600 flex flex-col items-center justify-center'>
          <h2 className='text-4xl font-extrabold text-white text-center'>Loading...</h2>
        </div>
      )
  }

  if (todos.error || categories.error) {
      return (
        <div className={`${openModal ? 'overflow-hidden' : ''} h-screen w-screen bg-slate-600 flex flex-col items-center justify-center`}>
          <h2 className='text-4xl font-extrabold text-white text-center'>Error</h2>
        </div>
      )
  }

  const handleFilter = (filter: FilterParams) => {
    setFilterOptions(filter)
  }

  const handleDisplay = (display: DisplayType) => {
    setDisplayList(display) 
  }

  //FIXME: close edit form
  const handleTodoEdit = (id: number) => {
    setTodoEditId(id)
    setOpenModal('Edit Todo')
  }

  const handleCategoryEdit = (id: number) => {
    setTodoEditId(id)
    setOpenModal('Edit Category')
  }

  const getTodoById = (id:number, ts: Todo[]) => {
    return ts.filter((t: Todo) => t.id === id)[0]
  }

  const getCategoryById = (id:number, cs: Category[]) => {
    return cs.filter((c: Category) => c.id === id)[0]
  }

  const handleCloseModal = () => {
    setOpenModal(null)
  }

  return (
    <div className='h-screen w-screen bg-slate-600 flex flex-col px-4 pt-4 pb-9'>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='p-8'>
        <h1 className='text-white text-5xl text-center font-extrabold'>Todo App</h1>
      </div>
      <Filter categories={categories.data} filtering={handleFilter}/>
      <Display displaying={handleDisplay}/>
      <div className='overflow-auto my-4'>
        {
          displayList === 'Todos' ? todos.data.map((t: TodoProps) => <TodoItem key={t.id} id={t.id} name={t.name} description={t.description} priority={t.priority} done={t.done} deadline={t.deadline} createdAt={t.createdAt} updatedAt={t.updatedAt} categories={t.categories} handleEdit={handleTodoEdit} />)
           : categories.data.map((c: any) => <CategoryItem key={c.id} id={c.id} name={c.name} description={c.description} createdAt={c.createdAt} updatedAt={c.updatedAt} todos={c.todos} handleEdit={handleCategoryEdit} />)
        }
      </div>
      {openModal === 'Edit Todo' && <Modal type={openModal} closeModal={handleCloseModal} />}
      {openModal === 'Edit Category' && <Modal type={openModal} closeModal={handleCloseModal} />}
      <button className='bg-rose-500 hover:bg-rose-600 text-white text-lg rounded-md shadow-lg my-2 p-2' onClick={() => {
        setOpenModal('Add Todo') }}>Add Todo</button>
      {openModal === 'Add Todo' && <Modal type={openModal} closeModal={handleCloseModal} />}
      <button className='bg-rose-500 hover:bg-rose-600 text-white text-lg rounded-md shadow-lg p-2' onClick={() => setOpenModal('Add Category')}>Add Category</button>
      {openModal === 'Add Category' && <Modal type={openModal} closeModal={handleCloseModal} />}
    </div>
  )
}

export default Home
