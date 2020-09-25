import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import ListItemSeparator from '../ListItemSeparator'

const ListItem = ({ title, content, image, IconComponent, onPress }) => {
  return (
    <>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.detailsContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              {title}
            </AppText>
            {content && <AppText style={styles.content}>{content}</AppText>}
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  title: {
    fontWeight: '700',
    color: 'black'
  },
  content: {
    color: colors.medium,
    width: '100%'
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '80%'
  }
})

export default ListItem
