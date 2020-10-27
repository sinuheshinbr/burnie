import moment from 'moment'
import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AppText from '../AppText'
import colors from '../../config/colors'

const PostItem = ({
  _id,
  title,
  parent,
  author,
  content = '',
  createdAt,
  image,
  canEditPost,
  navigation,
  firstPostTitle
}) => {
  const elapsedTime = moment(createdAt).fromNow()
  const defaultImage = require('../../assets/image-placeholder.png')
  const isPostItem = true

  return (
    <View style={styles.container}>
      {canEditPost && (
        <View style={styles.editIcon}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('EditPostScreen', {
                _id,
                title,
                content,
                parent,
                isPostItem,
                firstPostTitle
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
    color: colors.medium
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
