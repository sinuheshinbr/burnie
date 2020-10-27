import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../config/colors'

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
  }
})

export default Back
