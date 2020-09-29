import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import convertHours from '../../utils/convertHours'

const DiscussionItem = ({
  _id,
  title,
  author,
  comments = 0,
  likes = 0,
  views = 0,
  elapsedHours
}) => {
  let elapsedTime = convertHours(elapsedHours)
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={() => console.log('open discussion id: ', _id)}
    >
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
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
              <Text style={styles.iconText}>
                {comments > 99 ? '99+' : comments}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                size={16}
                name="heart-outline"
              />
              <Text style={styles.iconText}> {likes > 99 ? '99+' : likes}</Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                size={16}
                name="eye-outline"
              />
              <Text style={styles.iconText}>{views > 99 ? '99+' : views}</Text>
            </View>
          </View>
          <View style={styles.elapsedTime}>
            <Text style={styles.iconText}>
              {elapsedTime && `${elapsedTime} ago`}
            </Text>
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
  detailsContainer: {
    justifyContent: 'center',
    flex: 1
  },
  elapsedTime: {
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
    width: '25%'
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
