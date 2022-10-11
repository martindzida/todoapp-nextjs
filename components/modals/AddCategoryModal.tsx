import React from 'react';
import AddCategoryForm from '../forms/AddCategoryForm';
import {Props as AddCategoryProps} from '../forms/AddCategoryForm';

interface Props {
  payload: AddCategoryProps;
}

const AddCategoryModal = ({payload}: Props) => {
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <div className='relative transform overflow-hidden rounded-lg shadow-xl transition-all'>
            <AddCategoryForm todos={payload.todos} closeForm={payload.closeForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;

