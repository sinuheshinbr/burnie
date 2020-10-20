import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import convertHours from '../../utils/convertHours'

const DiscussionItem = ({
  _id,
  author,
  content = '',
  elapsedHours = null,
  image
}) => {
  let elapsedTime = convertHours(elapsedHours)
  const defaultImage = require('../../assets/image-placeholder.png')
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : defaultImage}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  author: {
    fontWeight: '700',
    color: colors.medium
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 10,
    flex: 1
  },
  content: {
    color: colors.medium
  },
  contentContainer: {
    flex: 1
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 15
  },
  elapsedTime: {
    color: colors.medium
  },
  elapsedTimeContainer: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  header: {
    flexDirection: 'row'
  }
})

export default DiscussionItem
