import React from 'react'
import TodoForm from './TodoForm'
import CategoryForm from './CategoryForm'
import { Props as TodoFormProps } from './TodoForm'
import { Props as CategoryFormProps} from './CategoryForm'


//FIXME: null shouldnt be probably possible
export type modalTypes = 'addTodo' | 'addCategory' | 'editTodo' | 'editCategory' | null
type payloadType = TodoFormProps | CategoryFormProps
interface Props {
  type: modalTypes,
  payload?: payloadType,
  closeModal: () => void
}

const Modal = (props: Props) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
            <div className='bg-slate-600 text-white text-center p-2'>
              <h3 className='text-2xl font-bold p-3'>{props.type}</h3>
              <button className='bg-rose-500 rounded-md p-2' onClick={props.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Modal