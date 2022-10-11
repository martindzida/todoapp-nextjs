import React from 'react';
import AddTodoForm from '../forms/AddTodoForm';
import {Props as AddTodoProps} from '../forms/AddTodoForm';

interface Props {
  payload: AddTodoProps;
}

const AddTodoModal = ({payload}: Props) => {
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <div className='relative transform overflow-hidden rounded-lg shadow-xl transition-all'>
            <AddTodoForm categories={payload.categories} closeForm={payload.closeForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;

