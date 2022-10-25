import {Todo} from '@prisma/client';
import {FilterParams} from '../../components/Filter';

//TODO: category problem
const useSortTodos = (todos: Todo[], filterOptions: FilterParams): Todo[] => {
  const {byDate, byCategory} = filterOptions;
  const sortedByDate = byDate === 'Desc' ? todos.sort((a: Todo, b: Todo) => b.id - a.id) : todos.sort((a: Todo, b: Todo) => a.id - b.id);
  return sortedByDate;
};

export default useSortTodos;

