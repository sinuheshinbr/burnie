import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import postsApi from '../api/posts'
import EditPostForm from '../components/forum/EditPostForm'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'

const EditPostScreen = ({ navigation, route }) => {
  const [isSubmitting, setIssubmitting] = useState(false)
  let isMounted = true
  const {
    _id,
    title,
    content,
    parent,
    isPostItem,
    firstPostTitle
  } = route.params
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const userId = user._id
  const { request: editPost } = useApi(postsApi.editPost)

  useEffect(() => {
    return () => (isMounted = false)
  }, [])

  const handleSubmit = async ({ title, content }) => {
    if (isMounted) setIssubmitting(true)
    const jwt = await authStorage.getToken()
    console.log('waiting for response...')
    const response = await editPost(userId, _id, title, content, jwt)
    console.log('response chegou: ')
    if (isMounted) setIssubmitting(false)
    if (response?.ok) {
      const pageToredirect = isPostItem
        ? 'ForumPostScreen'
        : 'ForumDiscussionsScreen'

      return navigation.navigate(pageToredirect, {
        editedPost: response.data.json
      })
    }
  }

  return (
    <>
      <Screen style={styles.screen}>
        <ProfileMenu path="Forum" />
        <EditPostForm
          isMounted={isMounted}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          navigation={navigation}
          _id={_id}
          title={title}
          content={content}
          parent={parent}
          firstPostTitle={firstPostTitle}
        />
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light
  }
})

export default EditPostScreen
