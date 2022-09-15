import React from 'react'
import TodoForm from './TodoForm'


interface Props {
  closeModal: () => void
}

const Modal = (props: Props) => {
  return (
    <div className='brightness-100 flex flex-col text-center text-white bg-slate-700 font-bold font-xl rounded-md p-8 my-2'>
      <h3 className='text-xl p-3'>Modal</h3>
      <button className='bg-rose-500 rounded-md p-2' onClick={props.closeModal}>Close</button>
    </div>
  )
}

export default Modal