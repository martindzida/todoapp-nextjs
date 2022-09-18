import React from 'react'
import EditTodoForm from '../forms/EditTodoForm'
import { Props as EditTodoProps } from '../forms/EditTodoForm'


export type modalType = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null

interface Props {
  type: modalType
  payload: EditTodoProps
}

const EditTodoModal = (props: Props) => { 

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
            <EditTodoForm categories={props.payload.categories} defaultTodo={props.payload.defaultTodo} closeForm={props.payload.closeForm} />
          </div>
        </div>
      </div>
  </div>
  )
}

export default EditTodoModal