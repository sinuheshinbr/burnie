import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const DiscussionItem = ({
  onPress,
  title,
  author,
  comments = 0,
  likes = 0,
  views = 0
}) => {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          {author && <AppText style={styles.author}>{author}</AppText>}
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{comments}</Text>
            <MaterialCommunityIcons
              color={colors.medium}
              size={16}
              name="message-outline"
            />
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{likes}</Text>
            <MaterialCommunityIcons
              color={colors.medium}
              size={16}
              name="heart-outline"
            />
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{views}</Text>
            <MaterialCommunityIcons
              color={colors.medium}
              size={16}
              name="eye-outline"
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  author: {
    color: colors.medium
  },

  container: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 1
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '10%',
    justifyContent: 'space-between'
  },
  iconText: {
    fontSize: 16,
    color: colors.medium
  },
  title: {
    fontWeight: '700',
    color: colors.medium
  }
})

export default DiscussionItem
