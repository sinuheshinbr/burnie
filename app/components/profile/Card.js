import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../../config/colors'

const Card = ({ title = '', minHeight, children }) => {
  return (
    <View style={[styles.container, { minHeight }]}>
      <Text style={styles.header}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '90%',
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 4
  }
})

export default Card
