import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import ListItemSeparator from '../ListItemSeparator'

const Post = ({
  title,
  content,
  image,
  IconComponent,
  elapsedTime,
  onPress
}) => {
  return (
    <>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.detailsContainer}>
            <View style={styles.titleContainer}>
              <AppText numberOfLines={1} style={styles.title}>
                {title}
              </AppText>
              <AppText numberOfLines={1} style={styles.elapsedTime}>
                {elapsedTime}
              </AppText>
            </View>
            {content && (
              <AppText numberOfLines={2} style={styles.content}>
                {content}
              </AppText>
            )}
          </View>
        </View>
      </TouchableHighlight>
      <ListItemSeparator />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    color: colors.medium,
    width: '100%'
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '80%'
  },
  elapsedTime: {
    color: colors.medium,
    width: '35%',
    textAlign: 'right'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  title: {
    fontWeight: '700',
    color: 'black',
    width: '65%'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default Post
