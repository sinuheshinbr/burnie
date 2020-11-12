import React from 'react'
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import ProfileLocation from './ProfileLocation'

const Profile = ({ name, occupation, city, image, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {image && (
          <View style={styles.shadow} elevation={5}>
            <Image elevation={5} source={image} style={styles.image} />
          </View>
        )}
        <View style={styles.detailsContainer}>
          <AppText numberOfLines={1} style={styles.name}>
            {name}
          </AppText>
          {occupation && (
            <AppText numberOfLines={1} style={styles.occupation}>
              {occupation}
            </AppText>
          )}
          {city && <ProfileLocation city={city} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  detailsContainer: {
    marginLeft: '5%',
    flexShrink: 1
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  name: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: '700',
    width: '100%'
  },

  occupation: {
    color: colors.medium
  },
  shadow: {
    width: 95,
    height: 95,
    borderRadius: 47.5
  }
})

export default Profile
