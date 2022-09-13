import React, { useState } from 'react'
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/solid'

const Filter = () => {

  const [ byDate, setByDate ] = useState<"Latest" | "Oldest">("Latest")

  return (
    <div className='flex flex-row justify-center items-center bg-slate-700 text-white shadow-lg rounded-md p-3 mx-3 m'>
      <div>
        {byDate === "Latest" ? <BarsArrowDownIcon className='w-5 h-5 text-white'/> : <BarsArrowUpIcon className='w-5 h-5 text-white' />}
      </div>
      <div className='mx-2'>
        <form>
          <select name="byDate" id="byDate" className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-1'>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default Filter