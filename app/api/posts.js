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
    JSON.stringify({
      title,
      content,
      id,
      parent
    }),
    createOptions(jwt, 'application/json')
  )
}

const deletePost = async (id, post, jwt) => {
  return await client.delete(
    `${endpoint}/${id}/${post}/1`,
    null,
    createOptions(jwt, 'application/json')
  )
}

const deleteDiscussion = async (id, post, jwt) => {
  return await client.delete(
    `${endpoint}/${id}/${post}/all`,
    null,
    createOptions(jwt, 'application/json')
  )
}

const editPost = async (id, post, title, content, jwt) => {
  return await client.post(
    `${endpoint}/${id}/${post}`,
    JSON.stringify({ title, content }),
    createOptions(jwt, 'application/json')
  )
}

const getPosts = async (id, jwt, post, limit) => {
  return await client.get(
    `${endpoint}/${id}/${post}/${limit}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

const incrementLikes = async (id, jwt, post, amount) => {
  return await client.put(
    `${endpoint}/${id}/${post}/likes`,
    JSON.stringify({ amount }),
    createOptions(jwt, 'application/json')
  )
}

const incrementViews = async (id, jwt, post) => {
  return await client.put(
    `${endpoint}/${id}/${post}/views`,
    null,
    createOptions(jwt, 'application/json')
  )
}

export default {
  createPost,
  getPosts,
  deletePost,
  editPost,
  deleteDiscussion,
  incrementLikes,
  incrementViews
}
