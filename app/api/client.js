import { create } from 'apisauce'

const apiClient = create({
  baseURL: 'https://odrsdxfb08.execute-api.sa-east-1.amazonaws.com/dev'
})

export default apiClient
