import React from 'react'
import EditCategoryForm from '../forms/EditCategoryForm'
import { Props as EditCategoryProps } from '../forms/EditCategoryForm'


export type modalType = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null

interface Props {
  type: modalType
  payload: EditCategoryProps
}

const EditCategoryModal = (props: Props) => { 

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
            <EditCategoryForm todos={props.payload.todos} defaultCategory={props.payload.defaultCategory} closeForm={props.payload.closeForm} />
          </div>
        </div>
      </div>
  </div>
  )
}

export default EditCategoryModal