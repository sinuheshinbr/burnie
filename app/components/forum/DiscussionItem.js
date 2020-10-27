import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
import React from 'react'

import AppText from '../AppText'
import colors from '../../config/colors'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import normalizeNumber from '../../utils/normalizeNumber'

const DiscussionItem = ({
  _id,
  author,
  canEditPost = false,
  comments = 0,
  content,
  createdAt,
  likes = 0,
  navigation,
  onPress,
  parent,
  title,
  views = 0
}) => {
  const elapsedTime = moment(createdAt).fromNow()
  let normalizedComments = normalizeNumber(comments)
  let normalizedLikes = normalizeNumber(likes)
  let normalizedViews = normalizeNumber(views)
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {canEditPost && (
          <View style={styles.editIcon}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('EditPostScreen', {
                  _id,
                  title,
                  content,
                  parent
                })
              }
            >
              <MaterialCommunityIcons
                color={colors.medium}
                size={20}
                name="pencil-outline"
              />
            </TouchableWithoutFeedback>
          </View>
        )}
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
  editIcon: {
    position: 'absolute',
    left: '97%',
    top: '12%'
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
