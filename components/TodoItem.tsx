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

  if (props.done) {
    priorityBg = 'bg-blue-600'
  }


  //TODO: Check icon, remove done
  return (
    <div className='bg-slate-700 text-white shadow-md rounded-md my-3 px-3 py-3'>
      <div className='flex flex-row p-2 mx-2'>
        <div className='grow'>
          <h4 className={`text-lg font-bold ${props.done ? 'line-through decoration-rose-500 decoration-4' : ''}`}>
            {props.name}
        </h4>
        </div>
        <div className='flex-none flex justify-end'>
          <span className={`${priorityBg} text-xs text-center font-semibold rounded-lg px-2 py-1`}>{props.done ? 'Done' : props.priority}</span>
        </div>
      </div>
      <div className='p-2 mx-2'>
        {formatDate(props.deadline)}
      </div>
      <div className='p-2 mx-2'>
          <p className={`text-sm ${props.done ? 'line-through decoration-rose-500 decoration-4' : ''}`}>{props.description}</p>
      </div>
      <div className='flex flex-row'>
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