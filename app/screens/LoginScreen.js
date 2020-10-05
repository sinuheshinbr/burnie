import React, { useRef } from 'react'
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'
import defaultStyles from '../config/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Back from '../components/Back'
import AppButton from '../components/AppButton'

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

const LoginScreen = ({ navigation }) => {
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
            onSubmit={values => {
              console.log(values)
              navigation.navigate('AppNavigator')
            }}
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
              isLast
            />
            <View style={styles.rememberContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PasswordResetScreen')}
              >
                <Text style={styles.resetPassword}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <SubmitButton width="80%" title="Login" />
            <AppButton
              onPress={() => navigation.navigate('RegisterScreen')}
              color={colors.transparent00}
              width="80%"
              title="Register"
            />
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
  container: {
    padding: 20
  },
  logo: {
    width: 100,
    height: 100
  },
  logoContainer: {
    marginTop: '25%',
    alignItems: 'center'
  },
  resetPassword: {
    color: defaultStyles.colors.light,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 16,
    letterSpacing: 1
  },
  formContainer: {
    width: '100%'
  },
  rememberContainer: {
    alignSelf: 'flex-end',
    marginBottom: '7.5%'
  },
  tagline: {
    color: colors.white,
    fontSize: 45,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default LoginScreen
