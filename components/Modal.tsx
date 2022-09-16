import React from 'react'
import TodoForm from './TodoForm'
import CategoryForm from './CategoryForm'
import { Props as TodoFormProps } from './TodoForm'
import { Props as CategoryFormProps} from './CategoryForm'


export type modalTypes = 'Add Todo' | 'Add Category' | 'Edit Todo' | 'Edit Category' | null
type payloadType = TodoFormProps | CategoryFormProps
interface Props {
  type: modalTypes,
  payload?: payloadType,
  closeModal: () => void
}

const Modal = (props: Props) => {

  const choseForm = (type: string | null) => {
    if (type === null) {
      return
    }
    const type_s = type.split(' ')
    if (type_s[0] === 'Add') {
      if (type_s[1] === 'Todo') {
        return <TodoForm method='add' />
      }
      return <CategoryForm method='add' />
    }

    if (type_s[1] === 'Todo') {
      return <TodoForm method='edit' />
    } else {
      return <CategoryForm method='edit' />
    }
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
            <div className='bg-slate-600 text-white text-center p-2'>
              {choseForm(props.type)}
              <button className='bg-rose-500 rounded-md p-2' onClick={props.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Modal