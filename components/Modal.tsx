import React from 'react'
import AddTodoForm from './EditTodoForm'
import EditTodoForm from './EditTodoForm'
import { Props as TodoFormProps } from './AddTodoForm'
import { Props as CategoryFormProps } from './AddCategoryForm'


export type modalType = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null
type payloadType = TodoFormProps | CategoryFormProps 

interface Props {
  type: modalType
  payload: payloadType
  closeModal: () => void
}


const Modal = (props: Props) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
          </div>
        </div>
      </div>
  </div>
  )
}

export default Modal