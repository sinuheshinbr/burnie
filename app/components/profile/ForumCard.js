import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import authStorage from '../../auth/storage'
import ActivitySpinner from '../ActivitySpinner'
import Card from './Card'
import colors from '../../config/colors'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import postsApi from '../../api/posts'
import ListItemSeparator from '../ListItemSeparator'
import Post from './Post'
import useApi from '../../hooks/useApi'

const ForumCard = ({ onPress, loading, posts, userId }) => {
  const defaultImage = require('../../assets/image-placeholder.png')
  const incrementViews = useApi(postsApi.incrementViews)
  const navigation = useNavigation()
  const [numberOfPosts, setNumberOfPosts] = useState(5)

  const handleClickPost = async post => {
    const jwt = await authStorage.getToken()
    navigation.navigate('ForumPostScreen', { item: post })
    let postId
    postId = post.parent ? post.parent._id : post._id
    incrementViews.request(userId, jwt, postId)
  }

  return (
    <Card onPress={onPress} title={loading ? 'Please wait...' : 'Forum'}>
      <View style={styles.container}>
        <ListItemSeparator />
        {loading && <ActivitySpinner height={400} />}
        {posts.slice(0, numberOfPosts).map(post => (
          <Post
            key={post._id}
            onPress={() => handleClickPost(post)}
            elapsedTime={dayjs(post.createdAt).fromNow()}
            title={post.title ? post.title : post.parent?.title}
            content={post.content}
            image={
              post.user.avatarUrl ? { uri: post.user.avatarUrl } : defaultImage
            }
          />
        ))}
        <TouchableWithoutFeedback
          onPress={() => setNumberOfPosts(numberOfPosts + 5)}
        >
          <Text style={styles.dots}>...</Text>
        </TouchableWithoutFeedback>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  dots: {
    fontSize: 30,
    color: colors.medium,
    textAlign: 'center',
    marginBottom: '3%'
  }
})

export default ForumCard
