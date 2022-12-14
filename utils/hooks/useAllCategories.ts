import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchCategories = () => axios.get('/api/categories').then(res => res.data)

const useAllCategories = () => useQuery(['categories'], fetchCategories)

export default useAllCategories