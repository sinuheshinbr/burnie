import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import ProfileLocation from './ProfileLocation'

const Profile = ({ title, occupation, city, image }) => {
  return (
    <View style={styles.container}>
      {image && (
        <View style={styles.shadow} elevation={5}>
          <Image elevation={5} source={image} style={styles.image} />
        </View>
      )}
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{title}</AppText>
        {occupation && (
          <AppText style={styles.occupation}>{occupation}</AppText>
        )}
        {city && <ProfileLocation city={city} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsContainer: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  title: {
    color: colors.dark,
    fontSize: 24,
    fontWeight: '700'
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
