import client from './client'

const endpoint = '/feels'

const createOptions = (jwt, contentType, onUploadProgress = () => {}) => {
  return {
    headers: {
      Authorization: jwt,
      'content-type': contentType
    },
    onUploadProgress: progress => {
      onUploadProgress(progress.loaded / progress.total)
    }
  }
}

const createFeel = async (id, feeling, jwt) => {
  return await client.post(
    `${endpoint}/${id}`,
    JSON.stringify({ feeling, id }),
    createOptions(jwt, 'application/json')
  )
}

const getFeels = async (id, jwt) => {
  return await client.get(
    `${endpoint}/${id}`,
    createOptions(jwt, 'application/json')
  )
}

export default {
  createFeel,
  getFeels
}
