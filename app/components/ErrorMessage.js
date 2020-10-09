import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../config/colors'

const ErrorMessage = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
    backgroundColor: colors.whiteTransparent02,
    height: 30,
    justifyContent: 'center',
    borderRadius: 5
  },
  text: {
    color: colors.white,
    fontSize: 20
  }
})

export default ErrorMessage
