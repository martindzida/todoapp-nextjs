import React from 'react'
import { useForm } from 'react-hook-form'
import { Todo } from '@prisma/client'

const AddTodo = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<Todo>()
  //callback funkce pro handlesubmit - query

  console.log(errors)

  return (
    <div className='bg-slate-700 text-center shadow-md rounded-md mx-2 my-3 px-2 py-3' >
        <h3 className='text-white text-xl font-bold p-2 my-2'>Add Todo</h3>
        <form onSubmit={handleSubmit((data) => {
          console.log(data)
        })} className='flex flex-col'>
            <input {...register('name', {required: "Name required", maxLength: {value: 64, message: "Name is too long"}})} name='name' type="text" placeholder='Name' className='focus:outline focus:outline-2 focus:outline-rose-500 rounded-md p-2 mx-3 my-2' />
            {errors.name && <small className='text-white'>{errors.name.message}</small>}
            <textarea {...register('description', {maxLength: {value: 256, message: "Description too long"}})} name='description' rows={4} placeholder='Description' className='resize-none focus:outline focus:outline-2 focus:outline-rose-500 rounded-md p-2 mx-3 my-2'></textarea>
            {errors.description && <small className='text-white'>{errors.description.message}</small>}
            <label htmlFor="priority" className='text-white'>Priority</label>
            <select {...register('priority')} id='priority' name='priority' className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-2 mx-3 my-2' >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
            </select>
            <label htmlFor="deadline" className='text-white'>Deadline</label>
            <input {...register('deadline', {required: true, valueAsDate: true})} id='deadline' name='deadline' type="date" className='bg-rose-500 text-white outline-none cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
            <input type="submit" className='bg-rose-500 text-white cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
        </form>
    </div>
  )
}

export default AddTodo