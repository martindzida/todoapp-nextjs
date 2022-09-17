import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchTodos = () => axios.get('/api/todos').then(res => res.data)

const useAllTodos = () => useQuery(['todos'], fetchTodos)

export default useAllTodos