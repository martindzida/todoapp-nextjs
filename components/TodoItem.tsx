import React from 'react'
import { Todo } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'


const TodoItem = (props: Todo) => {


  const mutation = useMutation((id: number) => {
    return axios.delete(`/api/todo/${id}`)
  })

  const delTodo = (id: number) => {
    mutation.mutate(id)
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
    <div className='bg-slate-700 text-white shadow-md rounded-md mx-2 my-3 px-2 py-3'>
      <div className='flex flex-row font-bold p-2 mx-2'>
        <h4 className={`basis-3/4 text-lg ${props.done ? 'line-through decoration-rose-500 decoration-4' : ''}`}>
          {props.name}
        </h4>
        <span className={`basis-1/4 ${priorityBg} text-xs text-center rounded-lg px-2 py-1`}>{props.done ? 'Done' : props.priority}</span>
      </div>
      <div className='flex flex-row'>
        <p className={`basis-3/4 text-sm p-2 mx-2 ${props.done ? 'line-through decoration-rose-500 decoration-4' : ''}`}>{props.description}</p>
        <button className='basis-1/4 bg-rose-500 text-white rounded-md' onClick={() => {
          delTodo(props.id)
        }}>
          <XMarkIcon className='w-5 h-5' />
          </button>
      </div>
    </div>
  )
}

export default TodoItem