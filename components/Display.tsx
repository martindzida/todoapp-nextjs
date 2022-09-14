import React from 'react'
import { useForm } from 'react-hook-form'

const Display = () => {

    const { register, handleSubmit } = useForm()

    //TODO: add type/interface
    const handleDisplay = (data: any) => {
        console.log(data)
    }

  return (
    <div className='flex justify-end text-white rounded-md p-2'>
        <form onSubmit={handleSubmit(handleDisplay)}>
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