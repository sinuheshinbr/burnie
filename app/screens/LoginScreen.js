import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'
import AppCheckBox from '../components/AppCheckBox'
import defaultStyles from '../config/styles'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('E-mail'),
  password: Yup.string()
    .required()
    .min(4)
    .label('Password')
})

const WelcomeScreen = props => {
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
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ email: '', password: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" color="secondary" />
        </AppForm>
        <View style={styles.rememberContainer}>
          <AppCheckBox title="Remember-me" />
          <Text style={styles.resetPassword}>Forgot your password?</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  logo: {
    width: 100,
    height: 100
  },
  logoContainer: {
    marginTop: 90,
    alignItems: 'center'
  },
  resetPassword: {
    color: defaultStyles.colors.light,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 16,
    letterSpacing: 1
  },
  formContainer: {
    padding: 20,
    width: '100%'
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tagline: {
    color: colors.white,
    fontSize: 45,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default WelcomeScreen
