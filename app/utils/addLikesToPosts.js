const addLikesToPosts = (postsResponse, likesResponse, fatherPostResponse) => {
  let postsWithoutLikes = postsResponse.data.json.reverse()
  if (fatherPostResponse) {
    postsWithoutLikes = [fatherPostResponse.data.json[0], ...postsWithoutLikes]
  }
  const likesObjects = likesResponse.data.json
  const likedPostsArray = likesObjects.map(like => like.post)

  return postsWithoutLikes.map(post => {
    if (likedPostsArray.indexOf(post._id) >= 0) {
      return {
        ...post,
        isLiked: true
      }
    } else {
      return { ...post }
    }
  })
}

export default addLikesToPosts
