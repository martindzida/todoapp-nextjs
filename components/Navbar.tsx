import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = () => {
  return (
    <div className='fixed top-0 w-screen bg-slate-700 text-white p-3'>
      <Bars3Icon className='w-10 h-10'/>
    </div>
  )
}

export default Navbar