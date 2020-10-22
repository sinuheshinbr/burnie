import * as Yup from 'yup'
import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  RefreshControl,
  ScrollView
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import colors from '../config/colors'
import PostItem from '../components/forum/PostItem'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import postsApi from '../api/posts'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import ActivitySpinner from '../components/ActivitySpinner'

const validationSchema = Yup.object().shape({
  post: Yup.string()
    .required('Post something...')
    .max(500)
})

const ForumPostScreen = ({ route, navigation }) => {
  let isMounted = true
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user

  const { item } = route.params

  const createPost = useApi(postsApi.createPost)
  const getPosts = useApi(postsApi.getPosts)

  let parentId = ''
  if (item.title) {
    parentId = item._id
  } else {
    parentId = item.parent._id
  }

  let title = ''

  let firstPost = {}
  if (item.title) {
    ;(firstPost._id = item._id),
      (firstPost.userId = item.user._id),
      (firstPost.author = item.user.name),
      (firstPost.content = item.content),
      (firstPost.image = item.user.avatarUrl),
      (firstPost.createdAt = item.createdAt),
      (title = item.title)
  } else {
    ;(firstPost._id = item.parent._id),
      (firstPost.author = item.parentUserName),
      (firstPost.content = item.parent.content),
      (firstPost.image = item.parentAvatarUrl),
      (firstPost.createdAt = item.parent.createdAt),
      (title = item.parent.title)
  }

  const onLoad = async () => {
    const jwt = await authStorage.getToken()
    const response = await getPosts.request(_id, jwt, parentId)
    if (!response?.ok) return
    if (isMounted) {
      setPosts(response.data)
      setRefreshing(false)
    }
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const jwt = await authStorage.getToken()
    const response = await createPost.request(
      _id,
      null,
      values.post,
      jwt,
      item._id,
      item.user.name,
      item.user.avatarUrl
    )
    if (!response.ok) return

    if (isMounted) {
      setPosts([...posts, response.data[0]])
      Keyboard.dismiss()
      setSubmitting(false)
      resetForm()
    }
  }

  useEffect(() => {
    onLoad()
    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    if (route.params?.editedPost && isMounted) {
      const remainingPosts = posts.filter(
        post => post._id !== route.params.editedPost._id
      )

      const editedPostArray = posts.filter(
        post => post._id === route.params.editedPost._id
      )

      const editedPost = editedPostArray[0]

      editedPost.title = route.params.editedPost.title
      editedPost.content = route.params.editedPost.content
      setPosts([...remainingPosts, editedPost])
    }
  }, [route])

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path={`Forum`} />
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onLoad} />
        }
      >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
        >
          <PostItem
            canEditPost={_id === firstPost.userId}
            parent={parentId}
            title={title}
            navigation={navigation}
            key={firstPost._id}
            author={firstPost.author}
            _id={firstPost._id}
            content={firstPost.content}
            image={firstPost.image}
            createdAt={firstPost.createdAt}
          />
          {getPosts.loading && <ActivitySpinner />}
          {posts.map(post => (
            <PostItem
              canEditPost={_id === post.user._id}
              navigation={navigation}
              parent={parentId}
              title={title}
              key={post._id}
              author={post.user?.name}
              _id={post._id}
              content={post.content}
              image={post.user?.avatarUrl}
              createdAt={post.createdAt}
            />
          ))}
        </KeyboardAwareScrollView>
      </ScrollView>

      <View style={styles.form}>
        <AppForm
          validateOnChange={false}
          validateOnBlur={false}
          submitButtonTitle="publish"
          initialValues={{ post: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          displaySubmitButton
        >
          <AppFormField
            backgroundColor={colors.transparent02}
            name="post"
            autoCapitalize="none"
            placeholder="Write a comment... "
            autoCorrect={false}
            textContentType="none"
            numberOfLines={4}
            textAlignVertical="top"
            disableFocusDisplay
            textColor={colors.dark}
            multiline
          />
        </AppForm>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 20
  },
  form: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    marginTop: 30,
    width: 70,
    height: 70,
    alignSelf: 'center'
  },
  screen: {
    backgroundColor: colors.light
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: 20
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: 20,
    marginBottom: 10
  }
})

export default ForumPostScreen
