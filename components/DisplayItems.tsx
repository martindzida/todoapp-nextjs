import React from 'react';
import {DisplayType} from './Display';
import {TodoProps} from './TodoItem';
import {CategoryProps} from './CategoryItem';
import TodoItem from './TodoItem';
import CategoryItem from './CategoryItem';

interface Props {
  itemsType: DisplayType;
  items: TodoProps | CategoryProps;
}

const DisplayItems = ({itemsType, items}: Props) => {
  return <div></div>;
};

export default DisplayItems;

