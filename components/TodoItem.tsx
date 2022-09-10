import React from 'react'
import { Todo } from '@prisma/client'


const TodoItem = (props: Todo) => {

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
    <div className='bg-slate-700 text-white shadow-md rounded-md mx-2 my-3 px-2 py-3'>
      <div className='flex flex-row font-bold p-2 mx-2'>
        <h4 className={`basis-3/4 text-lg ${props.done ? 'line-through decoration-rose-500 decoration-4' : ''}`}>
          {props.name}
        </h4>
        <span className={`basis-1/4 ${priorityBg} text-xs text-center rounded-lg px-2 py-1`}>{props.priority}</span>
      </div>
      <p className='text-sm p-2 mx-2'>{props.description}</p>
    </div>
  )
}

export default TodoItem