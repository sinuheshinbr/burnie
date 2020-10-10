import { create } from 'apisauce'
import getEnvVars from '../../environment'
const { apiUrl } = getEnvVars()

const apiClient = create({
  baseURL: apiUrl
})

export default apiClient
