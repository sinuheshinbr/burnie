import { create } from 'apisauce'
import getEnvVars from '../../environment'
const { apiUrl } = getEnvVars()

const apiClient = create({
  baseURL: apiUrl,
  timeout: 2000
})

export default apiClient
