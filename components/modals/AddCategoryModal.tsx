import React from 'react'
import AddCategoryForm from '../forms/AddCategoryForm'
import { Props as AddCategoryProps } from '../forms/AddCategoryForm'


export type modalType = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null

interface Props {
  type: modalType
  payload: AddCategoryProps
}

const AddCategoryModal = (props: Props) => { 

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
            <AddCategoryForm todos={props.payload.todos} closeForm={props.payload.closeForm}/>
          </div>
        </div>
      </div>
  </div>
  )
}

export default AddCategoryModal