import React, { useRef } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Back from '../components/Back'
import ErrorMessage from '../components/ErrorMessage'
import usersApi from '../api/users'
import useApi from '../hooks/useApi'

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

const RegisterScreen = ({ navigation }) => {
  const { request: createUser, error, data } = useApi(usersApi.createUser)
  const passwordEl = useRef(null)
  const passwordConfirmEl = useRef(null)

  const handleSubmit = async values => {
    const response = await createUser(values)
    if (response) {
      navigation.navigate('AppNavigator', {
        screen: 'ConfigurationScreen',
        params: {
          email: response.data.email,
          id: response.data._id
        }
      })
    }
  }

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
        <Back
          marginTop="5%"
          color={colors.mediumLight}
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/burnie-logo.png')}
          />
          <Text style={styles.tagline}>Burnie</Text>
        </View>
        {error && (
          <ErrorMessage backgroundColor={colors.transparent02} error={data} />
        )}
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: ''
            }}
            onSubmit={values => {
              handleSubmit(values)
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
            <SubmitButton title="Sign Up" />
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
    marginTop: '5%',
    alignItems: 'center'
  },
  formContainer: {
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
