import React, { useEffect, useContext, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Dimensions
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import postsApi from '../api/posts'
import DiscussionItem from '../components/forum/DiscussionItem'
import IconButton from '../components/IconButton'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import ActivitySpinner from '../components/ActivitySpinner'

const ForumDiscussionsScreen = ({ navigation, route }) => {
  let isMounted = true
  const [posts, setPosts] = useState([])
  const { request: getPosts, loading } = useApi(postsApi.getPosts)
  const incrementViews = useApi(postsApi.incrementViews)
  const { user } = useContext(AuthContext)
  const { _id } = user
  const { editedPost, newPost, deletedPost } = route?.params

  const onLoad = async () => {
    const jwt = await authStorage.getToken()
    const response = await getPosts(_id, jwt)
    if (!response?.ok) return
    if (isMounted) setPosts(response.data.json.reverse())
  }

  useEffect(() => {
    onLoad()
    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    if (deletedPost && isMounted) {
      const remainingPosts = posts.filter(post => post._id !== deletedPost)
      setPosts(remainingPosts)
      delete route.params.deletedPost
    }
    if (newPost && isMounted) {
      setPosts([newPost[0], ...posts])
      delete route.params.newPost
    }
    if (editedPost && isMounted) {
      const remainingPosts = posts.filter(post => post._id !== editedPost._id)
      const editedPostArray = posts.filter(post => post._id === editedPost._id)
      const editedPost = editedPostArray[0]
      editedPost.title = editedPost.title
      editedPost.content = editedPost.content
      setPosts([editedPost, ...remainingPosts])
      delete route.params.editedPost
    }
  }, [route])

  const handleClickPost = async item => {
    const jwt = await authStorage.getToken()
    incrementViews.request(_id, jwt, item._id)
    navigation.navigate('ForumPostScreen', { item })
  }

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Forum" />
      <Text style={styles.text}>The Burnout Forum</Text>
      {loading && (
        <ActivitySpinner height={Dimensions.get('window').height * 0.687} />
      )}
      {!loading && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <DiscussionItem
              parent={item.parent}
              navigation={navigation}
              canEditPost={_id === item.user._id}
              key={item._id}
              title={item.title}
              content={item.content}
              author={item.user.name ?? 'Anonymous'}
              _id={item._id}
              createdAt={item.createdAt}
              onPress={() => handleClickPost(item)}
              views={item.views}
              comments={item.comments}
            />
          )}
          keyExtractor={post => post._id}
          refreshControl={<RefreshControl onRefresh={onLoad} />}
          contentContainerStyle={styles.container}
        />
      )}
      <View style={styles.newDiscussionButton}>
        <IconButton
          height={60}
          width={60}
          onPress={() => navigation.navigate('NewDiscussionFormScreen')}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={60}
            color={colors.primary}
          />
        </IconButton>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  newDiscussionButton: {
    height: '7.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2.5%',
    marginTop: '2.5%'
  },
  button: {
    width: '90%',
    alignSelf: 'center'
  },
  container: {
    width: '90%',
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
    marginTop: '2.5%',
    height: '7.5%'
  }
})

export default ForumDiscussionsScreen
