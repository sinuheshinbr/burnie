import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../config/colors'

const ErrorMessage = ({
  error,
  color = colors.white,
  backgroundColor,
  marginTop,
  marginBottom
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor, marginBottom, marginTop }]}
    >
      <Text style={[styles.text, { color }]}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
    height: 30,
    justifyContent: 'center',
    borderRadius: 5
  },
  text: {
    fontSize: 18
  }
})

export default ErrorMessage
