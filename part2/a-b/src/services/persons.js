import axios from 'axios'
const baseUrl = 'http://localhost:3001/phonebook'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}
  
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}
  
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}
  
export default { getAll, create, update, deletePerson }