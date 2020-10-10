import React from 'react'
import { View, StyleSheet } from 'react-native'

const Background = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3c51',
    flex: 1
  }
})

export default Background
