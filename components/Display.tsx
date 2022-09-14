import React from 'react'
import { useForm } from 'react-hook-form'

export type DisplayType = 'Todos' | 'Categories'

interface DisplayProps {
    displaying: (display: DisplayType) => void
}

const Display = (props: DisplayProps) => {

    const { register, handleSubmit } = useForm()

    const submitForm = (data: any) => {
        props.displaying(data.display)
    }

  return (
    <div className='flex justify-end text-white rounded-md p-2'>
        <form onSubmit={handleSubmit(submitForm)}>
            <select {...register('display')} name="display" id="display" className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-3'>
                <option value="Todos">Todos</option>
                <option value="Categories">Categories</option>
            </select>
            <input type="submit" value="Display" className='bg-rose-500 text-white cursor-pointer text-center rounded-md p-2 mx-3 my-2' />
        </form>
    </div>
  )
}

export default Display