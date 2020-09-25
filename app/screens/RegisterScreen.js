import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('E-mail'),
  password: Yup.string()
    .required()
    .min(4)
    .label('Password'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

const RegisterScreen = props => {
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
          initialValues={{ email: '', password: '', passwordConfirmation: '' }}
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
          <AppFormField
            name="passwordConfirmation"
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Confirm password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Sign Up" color="secondary" />
        </AppForm>
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
  formContainer: {
    padding: 20,
    width: '100%'
  },
  tagline: {
    color: colors.white,
    fontSize: 45,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default RegisterScreen
