import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import AppText from './AppText'
import colors from '../config/colors'

const ListItem = ({
  title,
  titleColor,
  subTitle,
  image,
  IconComponent,
  onPress
}) => {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image source={image} style={styles.image} />}
        <View style={styles.detailsContainer}>
          <AppText style={[styles.title, { color: titleColor }]}>
            {title}
          </AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  title: {
    fontWeight: '700'
  },
  subTitle: {
    color: colors.medium
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: 'center'
  }
})

export default ListItem
