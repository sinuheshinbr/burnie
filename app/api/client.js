import { create } from 'apisauce'
import getEnvVars from '../../environment'
const { apiUrl } = getEnvVars()

const apiClient = create({
  baseURL: apiUrl,
  timeout: 10000
})

export default apiClient
