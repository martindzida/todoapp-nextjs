import React from 'react';
import EditCategoryForm from '../forms/EditCategoryForm';
import {Props as EditCategoryProps} from '../forms/EditCategoryForm';

interface Props {
  payload: EditCategoryProps;
}

const EditCategoryModal = ({payload}: Props) => {
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <div className='relative transform overflow-hidden rounded-lg shadow-xl transition-all'>
            <EditCategoryForm todos={payload.todos} defaultCategory={payload.defaultCategory} closeForm={payload.closeForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;

