import React from 'react'
import { Todo } from '@prisma/client'
import { Mutation, useMutation } from '@tanstack/react-query'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { queryClient } from '../pages/_app'
import Spinner from './Spinner'


const TodoItem = (props: Todo) => {

  const formatDate = (date: Date) => {
    const s_date = date.toString()
    const d = s_date.split('T')[0]
    //TODO: generally should work with time, but for now i only have a date input
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

  const updMut = useMutation((id: number) => {
    return axios.put(`/api/todo/put/${id}`)
  })

  //FIXME: id might be completely useless
  const delTodo = (id: number) => {
    delMut.mutate(id)
  }

  //FIXME: must pass data to req.body
  const updTodo = (id: number) => {
    updMut.mutate(id)
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


  return (
    <div className='bg-slate-700 text-white shadow-md rounded-md mx-3 my-3 px-3 py-3'>
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
      <div className='flex flex-row'>
        <div className='grow'>
          <p className={`text-sm p-2 mx-2 ${props.done ? 'line-through decoration-rose-500 decoration-4' : ''}`}>{props.description}</p>
        </div>
        <div className='flex-none flex justify-end'>
          <button className='bg-rose-500 hover:bg-rose-600 text-white rounded-md mx-1 p-2' onClick={() => {
            updTodo(props.id)
          }}>
            {updMut.isLoading ? <Spinner /> : <PencilSquareIcon className='w-5 h-5' />}
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