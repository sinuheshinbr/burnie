import client from './client'

const endpoint = '/users'

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

const createUser = async userData => {
  return await client.post(endpoint, userData)
}

const updateUser = async (id, userData, jwt) => {
  return await client.post(
    `${endpoint}/${id}`,
    userData,
    createOptions(jwt, 'application/json')
  )
}

const uploadImage = async (id, jsonBase64, jwt, onUploadProgress) => {
  return await client.post(
    `${endpoint}/${id}/images`,
    jsonBase64,
    createOptions(jwt, 'application/json', onUploadProgress)
  )
}

export default {
  createUser,
  updateUser,
  uploadImage
}
