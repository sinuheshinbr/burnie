import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Back from '../components/Back'
import colors from '../config/colors'

const PasswordResetConfirmationScreen = props => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.container}>
        <Back />
        <View>
          <Text style={styles.text}>
            We have e-mailed you your password reset link!
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    padding: 20,
    width: '100%'
  },
  text: {
    textAlign: 'center',
    marginTop: 80,
    color: colors.light,
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default PasswordResetConfirmationScreen
