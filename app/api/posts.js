import client from './client'

const endpoint = '/posts'

const createOptions = (jwt, contentType) => {
  return {
    headers: {
      Authorization: jwt,
      'content-type': contentType
    }
  }
}

const createPost = async (id, title, content, jwt, parent) => {
  return await client.post(
    `${endpoint}/${id}`,
    JSON.stringify({ title, content, id, parent }),
    createOptions(jwt, 'application/json')
  )
}

const getPosts = async (id, jwt) => {
  return await client.get(
    `${endpoint}/${id}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

export default {
  createPost,
  getPosts
}
