import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Back from '../components/Back'
import colors from '../config/colors'
import Background from '../components/Background'

const PasswordResetConfirmationScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <Back
          marginTop="5%"
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <View>
          <Text style={styles.text}>
            We have e-mailed you your password reset link!
          </Text>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
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
