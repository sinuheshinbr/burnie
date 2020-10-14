import client from './client'

const endpoint = '/auth'

const login = async loginData => {
  return await client.post(endpoint, loginData)
}
const passwordReset = async email => {
  return await client.post(`${endpoint}/reset`, email)
}

export default {
  login,
  passwordReset
}
