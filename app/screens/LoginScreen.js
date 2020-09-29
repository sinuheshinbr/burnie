import React, { useRef } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'
import AppCheckBox from '../components/AppCheckBox'
import defaultStyles from '../config/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

const LoginScreen = props => {
  const passwordEl = useRef(null)
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
        <View behavior="padding" style={styles.formContainer}>
          <AppForm
            style={styles.form}
            initialValues={{ email: '', password: '' }}
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
            />
            <SubmitButton title="Login" color="secondary" />
          </AppForm>
          <View style={styles.rememberContainer}>
            <View style={styles.checkBox}>
              <AppCheckBox title="Remember-me" />
            </View>
            <Text style={styles.resetPassword}>Forgot your password?</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  checkBox: {
    marginLeft: -5
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
    marginTop: 20,
    height: 70,
    justifyContent: 'space-between'
  },
  tagline: {
    color: colors.white,
    fontSize: 45,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default LoginScreen
