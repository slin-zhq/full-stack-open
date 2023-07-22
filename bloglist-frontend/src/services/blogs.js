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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }