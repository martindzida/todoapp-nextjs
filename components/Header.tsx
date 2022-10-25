import React from 'react';

const Header = () => {
  return (
    <header>
      <div className='px-8 py-10 text-white text-center'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide'>Todo App</h1>
      </div>
      <div className='text-white text-center p-2 pb-10'>
        <p className='text-xl md:text-2xl font-bold'>Simple Todo App</p>
      </div>
    </header>
  );
};

export default Header;
