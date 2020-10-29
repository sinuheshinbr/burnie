import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import AppText from '../AppText'
import colors from '../../config/colors'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import normalizeNumber from '../../utils/normalizeNumber'
import EditPostButton from './EditPostButton'
import LikePostButton from './LikePostButton'

const DiscussionItem = ({
  _id,
  author,
  canEditPost = false,
  comments,
  content,
  createdAt,
  isLiked = false,
  isFather = false,
  likes = 0,
  navigation,
  onPress,
  parent,
  title,
  views
}) => {
  const [innerIsLiked, setInnerIsLiked] = useState(false)
  const elapsedTime = moment(createdAt).fromNow()
  let normalizedComments = normalizeNumber(comments)
  let normalizedLikes = normalizeNumber(likes)
  let normalizedViews = normalizeNumber(views)

  useEffect(() => {
    if (isLiked) setInnerIsLiked(true)
  }, [])

  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {canEditPost && (
          <EditPostButton
            navigation={navigation}
            parent={parent}
            _id={_id}
            title={title}
            content={content}
          />
        )}
        <LikePostButton
          isFather={isFather}
          isLiked={innerIsLiked}
          setIsliked={setInnerIsLiked}
          _id={_id}
        />
        <View style={styles.detailsContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          {content && (
            <AppText numberOfLines={2} style={styles.content}>
              {content}
            </AppText>
          )}
          <AppText style={styles.author}>
            Posted by: {author ? author : 'Anonymous'}
          </AppText>
        </View>
        <View style={styles.bottomLine}>
          <View style={styles.iconsContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                size={16}
                name="message-outline"
              />
              <Text style={styles.iconText}>{normalizedComments}</Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                size={16}
                name="heart-outline"
              />
              <Text style={styles.iconText}> {normalizedLikes}</Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                size={16}
                name="eye-outline"
              />
              <Text style={styles.iconText}>{normalizedViews}</Text>
            </View>
          </View>
          <View style={styles.elapsedTimeContainer}>
            <Text numberOfLines={1} style={styles.iconText}>
              {elapsedTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  author: {
    color: colors.medium,
    marginTop: 10,
    fontSize: 15
  },
  bottomLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10
  },
  content: {
    color: colors.medium
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 1,
    zIndex: -1
  },
  elapsedTimeContainer: {
    width: '45%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    flex: 1
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%'
  },
  iconText: {
    fontSize: 16,
    color: colors.medium,
    marginLeft: 5
  },
  title: {
    fontWeight: '700',
    color: colors.medium,
    fontSize: 20,
    width: '90%'
  }
})

export default DiscussionItem
