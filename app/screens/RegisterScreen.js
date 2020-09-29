import React, { useRef } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('E-mail'),
  password: Yup.string()
    .required()
    .min(4)
    .label('Password'),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is a required field')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const RegisterScreen = props => {
  const passwordEl = useRef(null)
  const passwordConfirmEl = useRef(null)

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
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
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: ''
            }}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppFormField
              errorColor={colors.light}
              backgroundColor={colors.transparent08}
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
              nextEl={passwordEl}
            />
            <AppFormField
              innerRef={passwordEl}
              errorColor={colors.light}
              backgroundColor={colors.transparent08}
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              nextEl={passwordConfirmEl}
            />
            <AppFormField
              innerRef={passwordConfirmEl}
              errorColor={colors.light}
              backgroundColor={colors.transparent08}
              name="passwordConfirmation"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Confirm password"
              secureTextEntry
              textContentType="password"
              isLast
            />
            <SubmitButton title="Sign Up" color="secondary" />
          </AppForm>
        </View>
      </KeyboardAwareScrollView>
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
