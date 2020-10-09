import client from './client'

const endpoint = '/users'

const createUser = userData => client.post(endpoint, userData)
const updateUser = (id, userData) => client.post(`${endpoint}/${id}`, userData)

export default {
  createUser,
  updateUser
}
