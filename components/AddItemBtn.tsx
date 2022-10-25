import React from 'react';

type NewItemType = 'Add Todo' | 'Add Category';

interface Props {
  itemType: NewItemType;
  handleAdd: (type: NewItemType) => void;
}

const AddItemBtn = ({itemType, handleAdd}: Props) => {
  return (
    <button
      className='bg-rose-500 hover:bg-rose-600 text-white text-lg rounded-md shadow-lg my-2 p-2'
      onClick={() => {
        handleAdd(itemType);
      }}
    >
      {itemType}
    </button>
  );
};

export default AddItemBtn;

