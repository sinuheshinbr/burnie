import client from './client'

const endpoint = '/discussions'

const createOptions = (jwt, contentType) => {
  return {
    headers: {
      Authorization: jwt,
      'content-type': contentType
    }
  }
}

const createDiscussion = async (id, title, content, jwt) => {
  return await client.post(
    `${endpoint}/${id}`,
    JSON.stringify({ title, content, id }),
    createOptions(jwt, 'application/json')
  )
}

const getDiscussions = async (id, jwt) => {
  return await client.get(
    `${endpoint}/${id}`,
    null,
    createOptions(jwt, 'application/json')
  )
}

export default {
  createDiscussion,
  getDiscussions
}
