import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = {
    headers: { Authorization: token}
  }

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl, config)
  return req.then(res => res.data)
}

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject, config)
  return req.then((res) => res.data)
}

const update = (id, newObject) => {

}

export default { getAll, create, setToken }