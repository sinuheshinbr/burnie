import * as Yup from 'yup'
import React, { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { AppForm, AppFormField } from '../forms'
import colors from '../../config/colors'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Your discussion need a title')
    .max(100),
  content: Yup.string()
    .required('Please, write a message')
    .max(500)
})

const NewDiscussionForm = ({ handleSubmit }) => {
  const contentEl = useRef(null)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Discussion: </Text>
      <AppForm
        displaySubmitButton
        submitButtonTitle="publish"
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
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flex: 1
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

export default NewDiscussionForm
