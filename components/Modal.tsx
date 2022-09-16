import React from 'react'
import TodoForm from './TodoForm'


interface Props {
  closeModal: () => void
}

const Modal = (props: Props) => {
  return (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity"></div>

    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all">
          <div className='bg-slate-600 text-white text-center p-32'>
            <h3 className='text-2xl font-semibold'>Modal</h3>
            <button className='bg-rose-500 rounded-md p-2' onClick={props.closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Modal