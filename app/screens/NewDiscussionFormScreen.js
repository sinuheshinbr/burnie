import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import postsApi from '../api/posts'
import NewDiscussionForm from '../components/forum/NewDiscussionForm'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import ActivityIndicator from '../components/ActivityIndicator'

const ForumDiscussionsScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user
  const { request: createPost, loading } = useApi(postsApi.createPost)

  const handleSubmit = async ({ title, content }) => {
    const jwt = await authStorage.getToken()
    const response = await createPost(_id, title, content, jwt)
    if (!response?.ok) return
    navigation.navigate('ForumDiscussionsScreen', {
      newPost: response.data.json
    })
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <Screen style={styles.screen}>
          <ProfileMenu path="Forum" />
          <NewDiscussionForm
            handleSubmit={handleSubmit}
            navigation={navigation}
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

export default ForumDiscussionsScreen
