import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ActivitySpinner from '../ActivitySpinner'
import Card from './Card'
import colors from '../../config/colors'
import moment from 'moment'
import ListItemSeparator from '../ListItemSeparator'
import Post from './Post'

const ForumCard = ({ onPress, loading, posts }) => {
  const [numberOfPosts, setNumberOfPosts] = useState(5)
  const navigation = useNavigation()
  const defaultImage = require('../../assets/image-placeholder.png')

  return (
    <Card
      onPress={onPress}
      title={loading ? 'Please wait...' : 'Forum'}
      minHeight={400}
    >
      <View style={styles.container}>
        <ListItemSeparator />
        {loading && <ActivitySpinner height={400} />}
        {posts.slice(0, numberOfPosts).map(post => (
          <Post
            key={post._id}
            onPress={() =>
              navigation.navigate('ForumPostScreen', { item: post })
            }
            elapsedTime={moment(post.createdAt).fromNow()}
            title={post.title ? post.title : post.parent.title}
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
