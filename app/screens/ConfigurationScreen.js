import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../components/Screen'
import colors from '../config/colors'
import { ProfileMenu } from '../components/profile'
import SelectPhoto from '../components/edit-profile/SelectPhoto'
import AppForm from '../components/forms/AppForm'
import * as Yup from 'yup'
import AppFormField from '../components/forms/AppFormField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Name'),
  city: Yup.string()
    .required()
    .label('City'),
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

const ConfigurationScreen = () => {
  const cityEl = useRef(null)
  const emailEl = useRef(null)
  const passwordEl = useRef(null)
  const passwordConfirmEl = useRef(null)

  return (
    <Screen style={styles.screen}>
      <ProfileMenu isEditing />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <SelectPhoto image={require('../assets/mosh.jpg')} />
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              name: '',
              city: '',
              email: '',
              password: '',
              passwordConfirmation: ''
            }}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppFormField
              textColor={colors.dark}
              name="name"
              autoCapitalize="words"
              icon="account-outline"
              iconColor={colors.medium}
              keyboardType="default"
              placeholder="Name"
              textContentType="name"
              nextEl={cityEl}
            />
            <AppFormField
              textColor={colors.dark}
              innerRef={cityEl}
              name="city"
              autoCapitalize="words"
              autoCorrect={false}
              icon="pin"
              iconColor={colors.medium}
              keyboardType="default"
              placeholder="City"
              textContentType="addressCity"
              nextEl={emailEl}
            />
            <AppFormField
              textColor={colors.dark}
              innerRef={emailEl}
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              iconColor={colors.medium}
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
              nextEl={passwordEl}
            />
            <AppFormField
              textColor={colors.dark}
              innerRef={passwordEl}
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              iconColor={colors.medium}
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              nextEl={passwordConfirmEl}
            />
            <AppFormField
              textColor={colors.dark}
              innerRef={passwordConfirmEl}
              name="passwordConfirmation"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              iconColor={colors.medium}
              placeholder="Confirm password"
              secureTextEntry
              textContentType="password"
            />
          </AppForm>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50
  },
  screen: {
    backgroundColor: colors.light
  }
})

export default ConfigurationScreen
