import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../../config/colors'

const ProfileMenu = props => {
  return (
    <View style={styles.container}>
      <Entypo name="menu" size={30} color={colors.dark} />
      <Entypo name="dots-three-vertical" size={22} color={colors.dark} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default ProfileMenu
