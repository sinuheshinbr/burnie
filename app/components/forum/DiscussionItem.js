import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import normalizeNumber from '../../utils/normalizeNumber'

const DiscussionItem = ({
  title,
  author,
  comments = 0,
  likes = 0,
  views = 0,
  elapsedTime = null,
  content,
  onPress
}) => {
  let normalizedComments = normalizeNumber(comments)
  let normalizedLikes = normalizeNumber(likes)
  let normalizedViews = normalizeNumber(views)
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          {content && (
            <AppText numberOfLines={2} style={styles.content}>
              {content}
            </AppText>
          )}
          {author && <AppText style={styles.author}>{author}</AppText>}
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
            <Text style={styles.iconText}>{elapsedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  author: {
    color: colors.medium,
    marginTop: 10
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
    flex: 1
  },
  elapsedTimeContainer: {
    width: '40%',
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
    color: colors.medium
  }
})

export default DiscussionItem
