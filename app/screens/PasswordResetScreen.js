import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AppFormField, AppForm, SubmitButton } from '../components/forms'
import colors from '../config/colors'
import * as Yup from 'yup'
import Back from '../components/Back'

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

const PasswordResetScreen = props => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ email: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          <Back />
          <View>
            <Text style={styles.text}>Type your e-mail to reset password:</Text>
          </View>
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
          />
          <SubmitButton title="send e-mail" color="secondary" />
        </AppForm>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  formContainer: {
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

export default PasswordResetScreen
