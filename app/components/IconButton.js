import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({
  children,
  onPress,
  width = 40,
  height = 40,
  borderRadius = 20
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { width, height, borderRadius }]}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center'
  }
})

export default Button
