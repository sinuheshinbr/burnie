import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import AppText from '../AppText'
import colors from '../../config/colors'

const ProfileLocation = ({ city }) => {
  return (
    <View style={styles.container}>
      <Entypo name="location-pin" size={20} color={colors.danger} />
      {city && <AppText style={styles.text}>{city}</AppText>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginTop: 2,
    color: colors.dark
  }
})

export default ProfileLocation
