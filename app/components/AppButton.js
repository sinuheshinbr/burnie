import React from 'react'
import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import colors from '../config/colors'

const AppButton = ({ title, onPress, color = 'secondary' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors[color] }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  text: {
    color: colors.white,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 2
  }
})

export default AppButton
