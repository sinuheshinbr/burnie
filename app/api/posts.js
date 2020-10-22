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

const createPost = async (
  id,
  title,
  content,
  jwt,
  parent,
  parentUserName,
  parentAvatarUrl
) => {
  return await client.post(
    `${endpoint}/${id}`,
    JSON.stringify({
      title,
      content,
      id,
      parent,
      parentUserName,
      parentAvatarUrl
    }),
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

export default {
  createPost,
  getPosts,
  editPost
}
