import React from 'react'
import { Category } from '@prisma/client'
import { Todo } from '@prisma/client'
import Spinner from './Spinner'
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { queryClient } from '../pages/_app'

export type CategoryProps = Category & {todos: Todo[] | [], handleEdit: (id: number) => void}


const CategoryItem = (props: CategoryProps) => {


    const delMut = useMutation((id: number) => {
        return axios.delete(`/api/category/delete/${id}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
        }
    })

    const updMut = useMutation((id: number) => {
        return axios.put(`/api/category/put/${id}`)
    })


    const delCat = (id: number) => {
        delMut.mutate(id)
    }

    const updCat = (id: number) => {
        updMut.mutate(id)
    }


  return (
    <div className='bg-slate-700 text-white shadow-md rounded-md my-3 px-3 py-3'>
      <div className='flex flex-row p-2 mx-2'>
        <div className='grow'>
          <h4 className='text-lg font-bold'>
            {props.name}
        </h4>
        </div>
      </div>
      <div className='p-2 mx-2'>
          <p className={'text-sm'}>{props.description}</p>
      </div>
      <div className='flex flex-row'>
        <div className='grow text-sm font-semibold p-2 mx-2'>
          {props.todos.length !== 0 && "Todos: "}
          {props.todos.map((t: Todo) => 
            <span key={t.id} className='bg-rose-500 text-center text-xs rounded-lg px-2 py-1'>{t.name}</span>
          )}
        </div>
        <div className='flex-none flex justify-end'>
          <button className='bg-rose-500 hover:bg-rose-600 text-white rounded-md mx-1 p-2' onClick={() => {
            props.handleEdit(props.id)
          }}>
            {updMut.isLoading ? <Spinner /> : <PencilSquareIcon className='w-5 h-5' />}
          </button>
        </div>
        <div className='flex-none flex justify-end'>
          <button className='bg-rose-500 hover:bg-rose-600 text-white rounded-md mx-1 p-2' onClick={() => {
            delCat(props.id)
          }}>
            {delMut.isLoading ? <Spinner /> : <XMarkIcon className='w-5 h-5' />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryItem