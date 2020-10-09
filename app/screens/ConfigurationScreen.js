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
import AppButton from '../components/AppButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import usersApi from '../api/users'
import useApi from '../hooks/useApi'

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

const ConfigurationScreen = ({ navigation, route }) => {
  const { request: updateUser, error, data } = useApi(usersApi.updateUser)
  const formRef = useRef(null)
  const cityEl = useRef(null)
  const emailEl = useRef(null)
  const { email, id } = route.params

  // const saveUser = async values => {
  //   console.log(id)
  //   console.log(values)
  //   const response = await updateUser(id, values)
  //   if (response) return navigation.navigate('HomeScreen')
  // }

  return (
    <Screen style={styles.screen}>
      <ProfileMenu
        onSave={() => {
          if (formRef.current) formRef.current.handleSubmit()
        }}
        isEditing
        path="Profile"
      />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <SelectPhoto image={require('../assets/mosh.jpg')} />
        <View style={styles.formContainer}>
          <AppForm
            innerRef={formRef}
            initialValues={{
              name: '',
              city: '',
              email: email
            }}
            onSubmit={values => {
              console.log(values)
              navigation.navigate('HomeScreen')
            }}
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
              isLast
            />
          </AppForm>
          <View style={styles.logout}>
            <AppButton
              onPress={() => navigation.navigate('LoginScreen')}
              textColor={colors.mediumLight}
              title="Logout"
              color="transparent08"
            >
              <MaterialCommunityIcons
                color={colors.mediumLight}
                size={25}
                name="logout"
              />
            </AppButton>
          </View>
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
  logout: {
    marginTop: 20
  },
  screen: {
    backgroundColor: colors.light
  }
})

export default ConfigurationScreen
