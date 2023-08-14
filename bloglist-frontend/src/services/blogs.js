import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({ headers: { Authorization: token }, })

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig())
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, getConfig())
  return response.data
}

const remove = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, getConfig())
  return response.data
}

export default { getAll, create, update, remove, setToken }