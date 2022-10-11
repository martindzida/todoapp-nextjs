import React from 'react';
import EditTodoForm from '../forms/EditTodoForm';
import {Props as EditTodoProps} from '../forms/EditTodoForm';

interface Props {
  payload: EditTodoProps;
}

const EditTodoModal = ({payload}: Props) => {
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <div className='relative transform overflow-hidden rounded-lg shadow-xl transition-all'>
            <EditTodoForm categories={payload.categories} defaultTodo={payload.defaultTodo} closeForm={payload.closeForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;

