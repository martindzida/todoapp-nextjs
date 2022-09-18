import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../pages/_app'
import { Category, Todo } from '@prisma/client'
import { XMarkIcon } from '@heroicons/react/24/solid'


enum Priority {
  Low,
  Normal,
  Important
}

//TODO: Picking categories 
interface CategoryProps {
  id: number,
  name: string
}
interface TodoFormProps {
  name: string,
  description?: string,
  priority?: Priority,
  deadline: Date,
}

export interface Props {
  categories: Category[],
  defaultTodo?: Todo,
  closeForm: () => void
}


const EditTodoForm = (props: Props) => { 
  //FIXME: defaultValues problem
  const { register, handleSubmit, formState: { errors }} = useForm<TodoFormProps>()

  const addTodo = useMutation((newTodo: TodoFormProps) => {
    return axios.post('/api/todo/create', newTodo)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    }
  })

  const updTodo = useMutation((editTodo: TodoFormProps) => {
    return axios.put('/api/todo/put', editTodo)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    }
  })

  const submitForm = (data: TodoFormProps) => {
    updTodo.mutate(data)
  }


  return (
    <div className='bg-slate-700 text-center shadow-md rounded-md my-3 px-2 py-3' >
        <div className='flex flex-row justify-end'>
          <button className='bg-rose-500 rounded-md p-1' onClick={props.closeForm}>
            <XMarkIcon className='w-5 h-5 text-white'/>
          </button>
        </div>
        <h3 className='text-white text-xl font-bold p-2 my-2'>Edit Todo</h3>
        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col'>
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
            <input type="submit" value='Edit' className='bg-rose-500 text-white cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
        </form>
    </div>
  )
}

export default EditTodoForm