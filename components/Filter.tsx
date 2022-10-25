import React from 'react';
import {BarsArrowDownIcon, BarsArrowUpIcon, FunnelIcon} from '@heroicons/react/24/solid';
import {useForm} from 'react-hook-form';
import {Category} from '@prisma/client';

export interface FilterParams {
  byDate: 'Desc' | 'Asc';
  byCategory: string;
}
interface FilterProps {
  categories: Category[];
  filtering: (filter: FilterParams) => void;
}

const Filter = (props: FilterProps) => {
  const {register, handleSubmit, watch} = useForm();

  const submitForm = (data: any) => {
    props.filtering(data);
  };

  const sortDate = watch('byDate', 'Latest');

  return (
    <>
      <div className='flex items-center gap-6'>
        <div>{sortDate === 'Desc' ? <BarsArrowDownIcon className='w-5 h-5 text-white' /> : <BarsArrowUpIcon className='w-5 h-5 text-white' />}</div>
        <form onSubmit={handleSubmit(submitForm)}>
          <select {...register('byDate')} name='byDate' id='byDate' className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-1'>
            <option value='Desc'>Latest</option>
            <option value='Asc'>Oldest</option>
          </select>
          <select
            {...register('byCategory')}
            name='byCategory'
            id='byCategory'
            className='bg-rose-500 text-white text-center cursor-pointer rounded-md p-1'
          >
            {props.categories.map((c: Category) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <input type='submit' value='Find' className='bg-rose-500 text-white cursor-pointer text-center rounded-md px-2 py-1 mx-2' />
        </form>
      </div>
    </>
  );
};

export default Filter;

