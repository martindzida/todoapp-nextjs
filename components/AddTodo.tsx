import React from 'react'
import { useForm } from 'react-hook-form'

const AddTodo = () => {

    const { register, handleSubmit} = useForm()

  return (
    <div className='bg-slate-700 text-center shadow-md rounded-md mx-2 my-3 px-2 py-3'>
        <h3 className='text-white text-xl font-bold p-2 my-2'>Add Todo</h3>
        <form className='flex flex-col'>
            <input type="text" placeholder='Name' className='focus:outline focus:outline-2 focus:outline-rose-500 rounded-md p-3 mx-3 my-2' />
            <select className='rounded-md p-3 mx-3 my-2'>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
            </select>
            <input type="submit" className='bg-rose-500 text-white hover:bg-rose-600 cursor-pointe text-center rounded-md p-3 mx-3 my-2'/>
        </form>
    </div>
  )
}

export default AddTodo