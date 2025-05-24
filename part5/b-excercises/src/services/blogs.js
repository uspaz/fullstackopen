import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token}
  }

  const req = axios.get(baseUrl, config)
  return req.then(res => res.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token}
  }

  const req = axios.post(baseUrl, newObject, config)
  return req.then((res) => res.data)
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token}
  }

  const req = axios.put(`${baseUrl}/${id}`, newObject, config)
  return req.then(res => res.data)
}

export default { getAll, create, setToken, update }