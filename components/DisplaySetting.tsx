import React from 'react';
import {useForm} from 'react-hook-form';

export type DisplayType = 'Todos' | 'Categories';

interface DisplayProps {
  displaying: (display: DisplayType) => void;
}

const DisplaySetting = ({displaying}: DisplayProps) => {
  const {register, handleSubmit} = useForm();

  const submitForm = (data: any) => {
    displaying(data.display);
  };

  return (
    <div className='flex justify-end text-white rounded-md p-2'>
      <form onChange={handleSubmit(submitForm)}>
        <select {...register('display')} name='display' id='display' className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-3'>
          <option value='Todos'>Todos</option>
          <option value='Categories'>Categories</option>
        </select>
      </form>
    </div>
  );
};

export default DisplaySetting;

