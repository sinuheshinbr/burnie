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
    .label('E-mail')
})

const PasswordResetScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.formContainer}>
        <Back
          marginTop="5%"
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <AppForm
          initialValues={{ email: '' }}
          onSubmit={values => {
            console.log(values)
            navigation.navigate('PasswordResetConfirmationScreen')
          }}
          validationSchema={validationSchema}
        >
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
            isLast
          />
          <SubmitButton title="send e-mail" />
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
    width: '100%',
    flex: 1
  },
  text: {
    textAlign: 'center',
    marginTop: '20%',
    color: colors.light,
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 20
  }
})

export default PasswordResetScreen
