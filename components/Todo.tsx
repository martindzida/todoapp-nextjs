import React from 'react'
import { Todo } from '@prisma/client'


const Todo = (props: Todo) => {
  return (
    <div className='bg-slate-700 text-white shadow-md rounded-md mx-2 my-3 px-2 py-3'>
      <div className='flex flex-row font-bold p-2 mx-2'>
        <h4 className='basis-2/3 text-xl'>
          {props.name}
        </h4>
        <span className='basis-1/3 bg-amber-500 text-xs text-center rounded-lg px-2 py-1'>{props.priority}</span>
      </div>
      <p className='text-sm p-2 mx-2'>{props.description}</p>
    </div>
  )
}

export default Todo