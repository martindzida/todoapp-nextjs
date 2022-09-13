import React, { useState } from 'react'
import { BarsArrowDownIcon, BarsArrowUpIcon, FunnelIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'

const Filter = () => {

  const { register, handleSubmit, watch } = useForm()

  const submitForm = (data: any) => {
    console.log(data)
  }

  const sortDate = watch('byDate', 'Latest')

  return (
    <div className='flex flex-row justify-center items-center bg-slate-700 text-white shadow-lg rounded-md p-3 mx-3 m'>
      <div>
        {sortDate === "Latest" ? <BarsArrowDownIcon className='w-5 h-5 text-white'/> : <BarsArrowUpIcon className='w-5 h-5 text-white' />}
      </div>
      <div className='mx-2'>
        <form onSubmit={handleSubmit(submitForm)}>
          <select {...register('byDate')} name="byDate" id="byDate" className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-1'>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <input type="submit" value="Find" className='bg-rose-500 text-white cursor-pointer text-center rounded-md px-2 py-1 mx-2'/>
        </form>
      </div>
    </div>
  )
}

export default Filter