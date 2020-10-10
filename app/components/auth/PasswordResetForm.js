import React from 'react'
import Back from '../../components/Back'
import { AppFormField, AppForm, SubmitButton } from '../../components/forms'
import { StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import colors from '../../config/colors'
import ErrorMessage from '../ErrorMessage'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('E-mail')
})

const passwordResetForm = ({ navigation, error, data, handleSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <Back marginTop="5%" onPress={() => navigation.navigate('LoginScreen')} />
      <AppForm
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View>
          <Text style={styles.text}>Type your e-mail to reset password:</Text>
        </View>
        {error && (
          <ErrorMessage backgroundColor={colors.transparent02} error={data} />
        )}
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
  )
}

const styles = StyleSheet.create({
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

export default passwordResetForm
