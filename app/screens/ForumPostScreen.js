import * as Yup from 'yup'
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import colors from '../config/colors'
import PostItem from '../components/forum/PostItem'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import SubmitButton from '../components/forms/SubmitButton'
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

const ForumPostScreen = ({ route }) => {
  let isMounted = true
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

  let firstPost = {}
  if (item.title) {
    ;(firstPost._id = item._id),
      (firstPost.author = item.user.name),
      (firstPost.content = item.content),
      (firstPost.image = item.user.avatarUrl),
      (firstPost.createdAt = item.createdAt)
  } else {
    ;(firstPost._id = item.parent._id),
      (firstPost.author = item.parent.user.name),
      (firstPost.content = item.parent.content),
      (firstPost.image = item.parent.user.avatarUrl),
      (firstPost.createdAt = item.parent.createdAt)
  }

  const onLoad = async () => {
    const jwt = await authStorage.getToken()
    const response = await getPosts.request(_id, jwt, parentId)
    if (!response?.ok) return
    if (isMounted) setPosts(response.data)
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const jwt = await authStorage.getToken()
    const response = await createPost.request(
      _id,
      null,
      values.post,
      jwt,
      item._id
    )
    if (!response.ok) return

    if (isMounted) setPosts([...posts, response.data[0]])
    Keyboard.dismiss()
    if (isMounted) setSubmitting(false)
    resetForm()
  }

  useEffect(() => {
    onLoad()
    return () => (isMounted = false)
  }, [])

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path={`Forum`} />
      <Text style={styles.title}>{item.title}</Text>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <PostItem
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
            key={post._id}
            author={post.user?.name}
            _id={post._id}
            content={post.content}
            image={post.user?.avatarUrl}
            createdAt={post.createdAt}
          />
        ))}
      </KeyboardAwareScrollView>
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
