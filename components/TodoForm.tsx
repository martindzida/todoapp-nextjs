import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../pages/_app'
import { Category } from '@prisma/client'


enum Priority {
  Low,
  Normal,
  Important
}

interface CategoryProp {
  id: number,
  name: string
}
interface TodoFormProps {
  name: string,
  description?: string,
  priority?: Priority,
  deadline: Date,
  categories?: CategoryProp[]

}

const TodoForm = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<TodoFormProps>()
  const mutation = useMutation((newTodo: TodoFormProps) => {
    return axios.post('/api/todo/create', newTodo)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    }
  })

  const onSubmit = (data: TodoFormProps) => {
    mutation.mutate(data)
  }


  return (
    <div className='bg-slate-700 text-center shadow-md rounded-md mx-2 my-3 px-2 py-3' >
        <h3 className='text-white text-xl font-bold p-2 my-2'>Add Todo</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <input {...register('name', {required: "Name required", maxLength: {value: 64, message: "Name is too long"}})} name='name' type="text" placeholder='Name' className='focus-visible:outline focus-visible:outline-2 focus:outline-rose-500 rounded-md p-2 mx-3 my-2' />
            {errors.name && <small className='text-white'>{errors.name.message}</small>}
            <textarea {...register('description', {maxLength: {value: 256, message: "Description too long"}})} name='description' rows={4} placeholder='Description' className='resize-none focus-visible:outline focus-visible:outline-2 focus:outline-rose-500 rounded-md p-2 mx-3 my-2'></textarea>
            {errors.description && <small className='text-white'>{errors.description.message}</small>}
            <label htmlFor="priority" className='text-white'>Priority</label>
            <select {...register('priority')} id='priority' name='priority' className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-2 mx-3 my-2' >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
            </select>
            <label htmlFor="deadline" className='text-white'>Deadline</label>
            <input {...register('deadline', {required: true, valueAsDate: true})} id='deadline' name='deadline' type="date" className='bg-rose-500 text-white outline-none cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
            <input type="submit" value="Add" className='bg-rose-500 text-white cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
        </form>
    </div>
  )
}

export default TodoForm