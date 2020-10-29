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

import ActivitySpinner from '../components/ActivitySpinner'
import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import likesApi from '../api/likes'
import postsApi from '../api/posts'
import PostItem from '../components/forum/PostItem'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import addLikesToPosts from '../utils/addLikesToPosts'

const validationSchema = Yup.object().shape({
  post: Yup.string()
    .required('Post something...')
    .max(500)
})

const ForumPostScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  let isMounted = true
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user

  const { item, editedPost, deletedPost } = route.params

  const createPost = useApi(postsApi.createPost)
  const getPosts = useApi(postsApi.getPosts)
  const getLikes = useApi(likesApi.getLikes)

  let parentId = ''
  if (item.parent) {
    parentId = item.parent._id
  } else {
    parentId = item._id
  }

  const onLoad = async () => {
    if (isMounted) setLoading(true)

    const jwt = await authStorage.getToken()
    const fatherPostResponse = await getPosts.request(
      _id,
      jwt,
      parentId,
      'father'
    )
    let postsResponse = await getPosts.request(_id, jwt, parentId, 'children')

    const likesResponse = await getLikes.request(_id, jwt)

    if (fatherPostResponse?.ok && postsResponse?.ok && likesResponse?.ok) {
      const postsWithLikes = addLikesToPosts(
        postsResponse,
        likesResponse,
        fatherPostResponse
      )

      if (isMounted) {
        setTitle(fatherPostResponse.data.json[0].title)
        setPosts(postsWithLikes)
        setRefreshing(false)
        setLoading(false)
      }
    }
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true)
    const jwt = await authStorage.getToken()
    const response = await createPost.request(
      _id,
      null,
      values.post,
      jwt,
      parentId,
      item.user.name,
      item.user.avatarUrl
    )
    if (!response.ok) return

    if (isMounted) {
      setIsSubmitting(false)
      setPosts([...posts, response.data.json[0]])
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
    if (deletedPost && isMounted) {
      const newPosts = posts.filter(post => post._id !== deletedPost)
      setPosts(newPosts)
      delete route.params.deletedPost
    }
    if (route.params?.editedPost && isMounted) {
      const indexOfEdited = posts.findIndex(
        post => post._id === route.params.editedPost._id
      )

      if (indexOfEdited >= 0) {
        const newPosts = [...posts]
        if (route.params.editedPost.title && isMounted)
          setTitle(route.params.editedPost.title)
        newPosts[indexOfEdited].content = route.params.editedPost.content
        if (isMounted) setPosts(newPosts)
      }
      delete route.params.editedPost
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
          {loading && <ActivitySpinner />}
          {!loading &&
            posts.map(post => (
              <PostItem
                _id={post._id}
                author={post.user?.name}
                canEditPost={_id === post.user._id}
                content={post.content}
                createdAt={post.createdAt}
                firstPostTitle={title}
                key={post._id}
                image={post.user?.avatarUrl}
                isLiked={post.isLiked}
                isFather={!post.parent}
                navigation={navigation}
                parent={parentId}
                title={post.title}
              />
            ))}
        </KeyboardAwareScrollView>
      </ScrollView>

      <View style={styles.form}>
        <AppForm
          isSubmitting={isSubmitting}
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
  screen: {
    backgroundColor: colors.light
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
