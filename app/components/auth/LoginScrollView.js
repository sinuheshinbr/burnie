import React, { useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppFormField, AppForm, SubmitButton } from '../forms'
import ErrorMessage from '../ErrorMessage'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import AppButton from '../AppButton'
import colors from '../../config/colors'
import * as Yup from 'yup'

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

const LoginScrollView = ({ navigation, error, data, handleSubmit }) => {
  const passwordEl = useRef(null)

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/burnie-logo.png')}
        />
        <Text style={styles.tagline}>Burnie</Text>
      </View>
      {error && <ErrorMessage color={colors.danger} error={data} />}
      <View behavior="padding" style={styles.formContainer}>
        <AppForm
          style={styles.form}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            errorColor={colors.white}
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
            isLast
          />

          <SubmitButton title="Login" />
          <AppButton
            onPress={() => navigation.navigate('RegisterScreen')}
            color={colors.transparent00}
            title="Register"
          />
          <View style={styles.rememberContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordResetScreen')}
            >
              <Text style={styles.resetPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </AppForm>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  logo: {
    width: 100,
    height: 100
  },
  logoContainer: {
    marginTop: '20%',
    alignItems: 'center'
  },
  resetPassword: {
    color: colors.light,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 16,
    letterSpacing: 1
  },
  formContainer: {
    width: '100%'
  },
  rememberContainer: {
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 5,
    padding: 6
  },
  tagline: {
    color: colors.white,
    fontSize: 45,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default LoginScrollView
