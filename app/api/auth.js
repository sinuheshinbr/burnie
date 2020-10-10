import client from './client'

const endpoint = '/auth'

const login = loginData => client.post(endpoint, loginData)
const passwordReset = email => client.post(`${endpoint}/reset`, email)

export default {
  login,
  passwordReset
}
