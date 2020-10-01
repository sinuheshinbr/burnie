import React from 'react'
import { Image, Text, ImageBackground, StyleSheet, View } from 'react-native'
import AppButton from '../components/AppButton'
import colors from '../config/colors'

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/burnie-logo.png')}
        />
        <Text style={styles.tagline}>Burnie</Text>
      </View>
      <View behavior="padding" style={styles.buttonsContainer}>
        <AppButton
          onPress={() => navigation.navigate('LoginScreen')}
          title="Login"
        />
        <AppButton
          onPress={() => navigation.navigate('RegisterScreen')}
          title="SignUp"
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    width: 100,
    height: 100
  },
  logoContainer: {
    marginTop: '35%',
    alignItems: 'center'
  },
  tagline: {
    color: colors.white,
    fontSize: 45,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default WelcomeScreen
