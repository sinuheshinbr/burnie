import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../config/colors'

const Back = () => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="caretleft"
        size={20}
        color={colors.medium}
        style={styles.icon}
      />
      <Text style={styles.text}>Back</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
