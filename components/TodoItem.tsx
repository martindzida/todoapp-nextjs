import React from 'react'
import { Todo, Category } from '@prisma/client'
import { Mutation, useMutation } from '@tanstack/react-query'
import { XMarkIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { queryClient } from '../pages/_app'
import Spinner from './Spinner'


//TODO: should be more consistent, in other components using interface for props
export type TodoProps = Todo & {categories: Category[] | [], handleEdit: (id: number) => void}

const TodoItem = (props: TodoProps) => {

  const formatDate = (date: Date) => {
    const s_date = date.toString()
    const d = s_date.split('T')[0]
    const p_d = d.split('-')
    
    return `${p_d[2]}. ${p_d[1]}. ${p_d[0]}`
  }

  const delMut = useMutation((id: number) => {
    return axios.delete(`/api/todo/delete/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    }
  })

  //FIXME: id might be completely useless
  const delTodo = (id: number) => {
    delMut.mutate(id)
  }


  let priorityBg = ''
  switch (props.priority) {
    case 'Important':
      priorityBg = 'bg-rose-600'
      break
    case 'Normal':
      priorityBg = 'bg-amber-500'
      break
    case 'Low':
      priorityBg = 'bg-green-600'
      break
  }


  return (
    <div className='bg-slate-700 text-white shadow-md rounded-md my-3 px-3 py-3'>
      <div className='flex p-2 mx-2'>
        <div className='grow'>
          <h4 className='text-lg font-bold'>
            {props.name}
        </h4>
        </div>
        <div className='flex-none flex justify-end ml-10 h-6'>
          <span className={`${priorityBg} text-xs text-center font-semibold rounded-md px-2 py-1`}>{props.priority}</span>
        </div>
      </div>
      <div className='p-2 mx-2 underline decoration-2 decoration-rose-500 underline-offset-4'>
        {formatDate(props.deadline)}
      </div>
      <div className='p-2 mx-2 mb-5'>
          <p className='text-sm italic'>{props.description}</p>
      </div>
      <div className='flex'>
        <div className='grow text-sm font-semibold p-2 mx-2'>
          {props.categories.length !== 0 && "Categories: "}
          {props.categories.map((c: Category) => 
            <span key={c.id} className='bg-rose-500 text-center text-xs rounded-lg px-2 py-1'>{c.name}</span>
          )}
        </div>
        <div className='flex-none flex justify-end'>
          <button className='bg-rose-500 hover:bg-rose-600 text-white rounded-md mx-1 p-2' onClick={() => {
            props.handleEdit(props.id)
          }}>
            <PencilSquareIcon className='w-5 h-5' />
          </button>
        </div>
        <div className='flex-none flex justify-end'>
          <button className='bg-rose-500 hover:bg-rose-600 text-white rounded-md mx-1 p-2' onClick={() => {
            delTodo(props.id)
          }}>
            {delMut.isLoading ? <Spinner /> : <XMarkIcon className='w-5 h-5' />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem