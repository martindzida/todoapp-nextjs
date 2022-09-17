import React from 'react'
import TodoForm from './TodoForm'
import { Props as todoProps } from './TodoForm'


interface Props {
  payload: todoProps
}

const TodoModal = (props: Props) => {

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
            <div className='bg-slate-700 text-center p-2'>
              <TodoForm method={props.payload.method} categories={props.payload.categories} closeForm={props.payload.closeForm} />
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default TodoModal