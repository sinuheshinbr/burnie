import * as Yup from 'yup'
import React, { useRef, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import discussionsApi from '../api/discussions'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import SubmitButton from '../components/forms/SubmitButton'
import useApi from '../hooks/useApi'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Your discussion need a title')
    .max(100),
  content: Yup.string()
    .required('Post something...')
    .max(500)
})

const ForumDiscussionsScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user
  const contentEl = useRef(null)
  const { request: createDiscussion } = useApi(discussionsApi.createDiscussion)

  const handleSubmit = async ({ title, content }) => {
    const jwt = await authStorage.getToken()
    const response = await createDiscussion(_id, title, content, jwt)
    if (!response?.ok) return
    navigation.navigate('ForumDiscussionsScreen')
  }

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Forum" />
      <View style={styles.container}>
        <Text style={styles.text}>New Discussion: </Text>
        <AppForm
          style={styles.form}
          initialValues={{ title: '', content: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            backgroundColor={colors.transparent02}
            name="title"
            autoCapitalize="none"
            placeholder="Give this discussion a title"
            autoCorrect={false}
            textContentType="none"
            textColor={colors.dark}
            nextEl={contentEl}
          />
          <AppFormField
            innerRef={contentEl}
            backgroundColor={colors.transparent02}
            name="content"
            autoCapitalize="none"
            placeholder="Write your post here"
            autoCorrect={false}
            textContentType="none"
            numberOfLines={4}
            textAlignVertical="top"
            bigFocusDisplay
            textColor={colors.dark}
            multiline
            isLast
          />
          <SubmitButton title="Publish" />
        </AppForm>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    alignSelf: 'center'
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    flex: 1
  },
  screen: {
    backgroundColor: colors.light
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: '5%',
    marginBottom: '5%'
  }
})

export default ForumDiscussionsScreen
