import client from './client'

const endpoint = '/users'

const createHeader = jwt => {
  return { headers: { Authorization: jwt } }
}

const createUser = userData => client.post(endpoint, userData)
const updateUser = (id, userData, jwt) =>
  client.post(`${endpoint}/${id}`, userData, createHeader(jwt))

export default {
  createUser,
  updateUser
}
