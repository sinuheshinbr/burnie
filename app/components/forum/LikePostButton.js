import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useContext } from 'react'

import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'
import colors from '../../config/colors'
import likesApi from '../../api/likes'
import postsApi from '../../api/posts'
import useApi from '../../hooks/useApi'

const EditPostButton = ({
  _id,
  parentId,
  isLiked,
  isFather,
  isMounted,
  setIsliked
}) => {
  const createLike = useApi(likesApi.createLike)
  const deleteLike = useApi(likesApi.deleteLike)
  const incrementLikes = useApi(postsApi.incrementLikes)
  const { user } = useContext(AuthContext)
  const userId = user._id

  const iconName = isLiked ? 'heart' : 'heart-outline'
  const iconColor = isLiked ? colors.danger : colors.medium

  const handleClick = async () => {
    const jwt = await authStorage.getToken()
    if (isLiked) {
      if (isMounted) setIsliked(false)
      deleteLike.request(userId, _id, jwt)
      if (isFather) {
        incrementLikes.request(userId, jwt, _id, -1)
      } else {
        incrementLikes.request(userId, jwt, parentId, -1)
      }
    } else {
      if (isMounted) setIsliked(true)
      createLike.request(userId, _id, jwt)
      if (isFather) {
        incrementLikes.request(userId, jwt, _id, 1)
      } else {
        incrementLikes.request(userId, jwt, parentId, 1)
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleClick}>
        <MaterialCommunityIcons color={iconColor} size={20} name={iconName} />
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '97%',
    top: '12%'
  }
})

export default EditPostButton
