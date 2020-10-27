import client from './client'

const endpoint = '/feelings'

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

const createFeeling = (id, feeling, jwt) => {
  return client.post(`${endpoint}/${id}`, JSON.stringify({ id, feeling }), {
    headers: {
      authorization: jwt,
      'Content-Type': 'application/json'
    }
  })
}

const getFeelings = async (id, jwt) => {
  return await client.get(
    `${endpoint}/${id}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

export default {
  createFeeling,
  getFeelings
}
