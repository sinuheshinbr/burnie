import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useContext } from 'react'

import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'
import colors from '../../config/colors'
import likesApi from '../../api/likes'
import useApi from '../../hooks/useApi'

const EditPostButton = ({
  _id,
  firstPost,
  isLiked,
  setFirstPost,
  setIsliked
}) => {
  const createLike = useApi(likesApi.createLike)
  const deleteLike = useApi(likesApi.deleteLike)
  const { user } = useContext(AuthContext)
  const userId = user._id

  const iconName = isLiked ? 'heart' : 'heart-outline'
  const iconColor = isLiked ? colors.danger : colors.medium

  const handleClick = async () => {
    const jwt = await authStorage.getToken()
    setIsliked(!isLiked)
    if (setFirstPost) setFirstPost({ ...firstPost, isLiked: isLiked })
    if (isLiked) return deleteLike.request(userId, _id, jwt)
    return createLike.request(userId, _id, jwt)
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
