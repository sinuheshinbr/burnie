import client from './client'

const endpoint = '/likes'

const createOptions = (jwt, contentType) => {
  return {
    headers: {
      Authorization: jwt,
      'content-type': contentType
    }
  }
}

const createLike = async (id, post, jwt) => {
  return await client.post(
    `${endpoint}/${id}/${post}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

const deleteLike = async (id, like, jwt) => {
  return await client.delete(
    `${endpoint}/${id}/${like}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

const getLikes = async (id, jwt) => {
  return await client.get(
    `${endpoint}/${id}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

export default {
  createLike,
  deleteLike,
  getLikes
}
