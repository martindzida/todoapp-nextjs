import type { NextPage } from 'next'
import Head from 'next/head'
import TodoItem from '../components/TodoItem'
import TodoForm from '../components/TodoForm'
import { useQuery } from '@tanstack/react-query'
import { Todo } from '@prisma/client'
import axios from 'axios'
import { useState } from 'react'


const Home: NextPage = () => {

  const [ addForm, toggleAddForm ] = useState(false)

  const fetchTodos = async () => axios.get('/api/todos').then(res => res.data)
  const { data, isLoading, error } = useQuery(['todos'], fetchTodos)

  if (isLoading) {
      return (
        <div className='h-screen w-screen bg-slate-600 flex flex-col items-center justify-center'>
          <h2 className='text-4xl font-extrabold text-white text-center'>Loading...</h2>
        </div>
      )
  }

  if (error) {
    return <div>Error</div>
  }
  
  //TODO: some flexbox or grid
  //FIXME: hover state not working anywhere, madness
  return (
    <div className='h-screen w-screen bg-slate-600 flex flex-col'>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='p-8'>
        <h1 className='text-white text-5xl text-center font-extrabold'>Todo App</h1>
      </div>
      {
        data.map((t: Todo) => <TodoItem key={t.id} id={t.id} name={t.name} description={t.description} priority={t.priority} done={t.done} deadline={t.deadline} createdAt={t.createdAt} updatedAt={t.updatedAt} />)
      }
      <button className='bg-rose-500 hover:bg-rose-600 text-white text-lg rounded-md shadow-lg mx-3 p-2' onClick={() => {
        toggleAddForm(!addForm) }}>Add Todo</button>
      {addForm && <TodoForm />}
    </div>
  )
}

export default Home
