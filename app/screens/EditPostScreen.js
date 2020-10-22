import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import postsApi from '../api/posts'
import EditPostForm from '../components/forum/EditPostForm'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import ActivityIndicator from '../components/ActivityIndicator'

const EditPostScreen = ({ navigation, route }) => {
  const { _id, title, content, parent } = route.params
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const userId = user._id
  const { request: editPost, loading } = useApi(postsApi.editPost)

  const handleSubmit = async ({ title, content }) => {
    const jwt = await authStorage.getToken()
    const response = await editPost(userId, _id, title, content, jwt)
    if (!response?.ok) return
    navigation.navigate('ForumDiscussionsScreen', { editedPost: response.data })
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <Screen style={styles.screen}>
          <ProfileMenu path="Forum" />
          <EditPostForm
            handleSubmit={handleSubmit}
            navigation={navigation}
            _id={_id}
            title={title}
            content={content}
            parent={parent}
          />
        </Screen>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light
  }
})

export default EditPostScreen
