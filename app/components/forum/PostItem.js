import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import convertHours from '../../utils/convertHours'

const DiscussionItem = ({ _id, author, content = '', elapsedHours = null }) => {
  let elapsedTime = convertHours(elapsedHours)
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={() => console.log('open discussion id: ', _id)}
    >
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <AppText numberOfLines={1} style={styles.author}>
            {author}
          </AppText>
          <View style={styles.elapsedTimeContainer}>
            <Text style={styles.elapsedTime}>
              {elapsedTime && `${elapsedTime} ago`}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <AppText style={styles.content}>{content}</AppText>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  author: {
    fontWeight: '700',
    color: colors.medium
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  elapsedTime: {
    color: colors.medium
  },
  elapsedTimeContainer: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})

export default DiscussionItem
