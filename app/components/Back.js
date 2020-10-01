import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text } from 'react-native'
import colors from '../config/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Back = ({ onPress, color = colors.light, marginTop }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { marginTop }]}
    >
      <MaterialCommunityIcons name="chevron-left" size={40} color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 15,
    color: colors.light,
    fontSize: 18
  },
  icon: {
    color: colors.light
  }
})

export default Back
