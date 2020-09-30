import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import colors from '../../config/colors'

const Card = ({ onPress, title = '', minHeight, children }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { minHeight }]}>
        <Text style={styles.header}>{title}</Text>
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
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
