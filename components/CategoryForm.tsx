import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../pages/_app'
import axios from 'axios'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Category, Todo } from '@prisma/client'



export interface Props {
  method: 'Add' | 'Edit',
  todos: Todo[],
  defaultCategory?: Category,
  closeForm: () => void
}

interface CategoryFormProps {
    name: string,
    description?: string,
}

const CategoryForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors }} = useForm<CategoryFormProps>()

  const mutation = useMutation((newCategory: CategoryFormProps) => {
    return axios.post('/api/category/create', newCategory)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories'])
    }
  })


  const submitForm = (data: CategoryFormProps) => {
    mutation.mutate(data)
  }
  return (
    <div className='bg-slate-700 text-center shadow-md rounded-md my-3 px-2 py-3' >
        <div className='flex flex-row justify-end'>
          <button className='bg-rose-500 rounded-md p-1' onClick={props.closeForm}>
            <XMarkIcon className='w-5 h-5 text-white'/>
          </button>
        </div>
        <h3 className='text-white text-xl font-bold p-2 my-2'>Add Category</h3>
        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col'>
            <input {...register('name', {required: "Name required", maxLength: {value: 64, message: "Name is too long"}})} name='name' type="text" placeholder='Name' className='focus-visible:outline focus-visible:outline-2 focus:outline-rose-500 rounded-md p-2 mx-3 my-2' />
            {errors.name && <small className='text-white'>{errors.name.message}</small>}
            <textarea {...register('description', {maxLength: {value: 256, message: "Description too long"}})} name='description' rows={4} placeholder='Description' className='resize-none focus-visible:outline focus-visible:outline-2 focus:outline-rose-500 rounded-md p-2 mx-3 my-2'></textarea>
            <input type="submit" value="Add" className='bg-rose-500 text-white cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
            {errors.description && <small className='text-white'>{errors.description.message}</small>}
        </form>
    </div>
  )
}

export default CategoryForm