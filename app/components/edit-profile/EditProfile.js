import React, { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Yup from 'yup'
import Screen from '../Screen'
import { ProfileMenu } from '../profile'
import ErrorMessage from '../ErrorMessage'
import AppForm from '../forms/AppForm'
import AppFormField from '../forms/AppFormField'
import AppButton from '../AppButton'
import SelectPhoto from '../edit-profile/SelectPhoto'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from '../../config/colors'

const validationSchema = Yup.object().shape({
  city: Yup.string().label('City'),
  email: Yup.string()
    .required()
    .email()
    .label('E-mail'),
  name: Yup.string().label('Name'),
  occupation: Yup.string().label('Occupation')
})

const EditProfile = ({
  error,
  data,
  handleSubmit,
  handleLogout,
  image,
  isMounted,
  setImage,
  user,
  progress,
  setProgress
}) => {
  const { city = '', email = '', name = '', occupation = '' } = user
  const formRef = useRef(null)
  const cityEl = useRef(null)
  const emailEl = useRef(null)
  const occupationEl = useRef(null)

  return (
    <Screen style={styles.screen}>
      <ProfileMenu isEditing path="Profile" />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <SelectPhoto
          progress={progress}
          setProgress={setProgress}
          image={image}
          isMounted={isMounted}
          setImage={setImage}
          user={user}
        />
        <View style={styles.formContainer}>
          {error && <ErrorMessage color={colors.danger} error={data} />}
          <AppForm
            displaySubmitButton
            submitButtonTitle="save"
            innerRef={formRef}
            initialValues={{
              name,
              city,
              email,
              occupation
            }}
            onSubmit={handleSubmit}
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
              nextEl={occupationEl}
            />
            <AppFormField
              textColor={colors.dark}
              innerRef={occupationEl}
              name="occupation"
              autoCapitalize="words"
              autoCorrect={false}
              icon="briefcase-outline"
              iconColor={colors.medium}
              keyboardType="default"
              placeholder="Occupation"
              textContentType="jobTitle"
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
              onPress={handleLogout}
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
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50
  },
  logout: {
    marginTop: 20
  },
  screen: {
    backgroundColor: colors.light
  }
})

export default EditProfile
