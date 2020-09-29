import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'
import ProfileLocation from './ProfileLocation'

const Profile = ({ name, occupation, city, image }) => {
  return (
    <View style={styles.container}>
      {image && (
        <View style={styles.shadow} elevation={5}>
          <Image elevation={5} source={image} style={styles.image} />
        </View>
      )}
      <View style={styles.detailsContainer}>
        <AppText style={styles.name}>{name}</AppText>
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
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  detailsContainer: {
    marginLeft: '5%',
    flex: 1
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
