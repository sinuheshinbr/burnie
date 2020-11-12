import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

import AppText from '../AppText'
import colors from '../../config/colors'
import EditPostButton from './EditPostButton'
import LikePostButton from './LikePostButton'

const PostItem = ({
  _id,
  author,
  canEditPost,
  content = '',
  createdAt,
  firstPostTitle,
  image,
  isLiked = false,
  isFather = false,
  isMounted,
  navigation,
  parent,
  title = ''
}) => {
  const [innerIsLiked, setInnerIsLiked] = useState(false)
  const elapsedTime = dayjs(createdAt).fromNow()
  const defaultImage = require('../../assets/image-placeholder.png')
  const isPostItem = true

  useEffect(() => {
    if (isLiked) setInnerIsLiked(true)
  }, [isLiked])

  return (
    <View style={styles.container}>
      {canEditPost && (
        <EditPostButton
          navigation={navigation}
          parent={parent}
          _id={_id}
          title={title}
          content={content}
          isPostItem={isPostItem}
          firstPostTitle={firstPostTitle}
        />
      )}
      <LikePostButton
        parentId={parent}
        isFather={isFather}
        isLiked={innerIsLiked}
        isMounted={isMounted}
        setIsliked={setInnerIsLiked}
        _id={_id}
      />
      <Image
        source={image ? { uri: image } : defaultImage}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <AppText numberOfLines={1} style={styles.author}>
          {author ? author : 'Anonymous'}
        </AppText>
        <View style={styles.contentContainer}>
          <AppText style={styles.content}>{content}</AppText>
        </View>
        <View style={styles.elapsedTimeContainer}>
          <Text style={styles.elapsedTime}>{elapsedTime}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  author: {
    fontWeight: '700',
    color: colors.medium,
    width: '80%'
  },
  container: {
    flexDirection: 'row',
    padding: '3%',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: '3%',
    flex: 1
  },
  content: {
    color: colors.medium
  },
  contentContainer: {
    marginTop: '1%',
    flex: 1
  },
  detailsContainer: {
    zIndex: -1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: '5%'
  },
  editIcon: {
    position: 'absolute',
    left: '97%',
    top: '12%'
  },
  elapsedTime: {
    color: colors.medium
  },
  elapsedTimeContainer: {
    marginTop: '1%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
})

export default PostItem
