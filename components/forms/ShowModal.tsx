import React from 'react';
import {modalType} from '../../pages';
import AddTodoModal from '../modals/AddTodoModal';
import EditTodoModal from '../modals/EditTodoModal';
import AddCategoryModal from '../modals/AddCategoryModal';
import EditCategoryModal from '../modals/EditCategoryModal';

interface Props {
  type: modalType;
  payload: any;
  closeForm: () => void;
}
//FIXME: types problem

const ShowModal = ({type, closeForm}: Props) => {
  const modal: Record<string, JSX.Element> = {
    'Add Todo': <AddTodoModal payload={} />,
    'Edit Todo': <EditTodoModal payload={} />,
    'Add Category': <AddCategoryModal payload={} />,
    'Edit Category': <EditCategoryModal payload={} />,
  };
  return (
    <div>
      <div></div>
    </div>
  );
};

export default ShowModal;

