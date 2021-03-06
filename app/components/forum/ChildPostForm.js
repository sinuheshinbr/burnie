import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../../config/colors'
import AppForm from '../forms/AppForm'
import AppFormField from '../forms/AppFormField'
import * as Yup from 'yup'
import AppButton from '../AppButton'

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Please, write a message')
    .max(500)
})

const ParentPostForm = ({
  handleSubmit,
  title,
  content,
  contentEl,
  firstPostTitle,
  isSubmitting,
  isMounted,
  handleDelete,
  isDeleting
}) => {
  return (
    <>
      <Text style={styles.title}>Re: {firstPostTitle}</Text>
      <AppForm
        isSubmitting={isSubmitting}
        displaySubmitButton
        submitButtonTitle="save"
        initialValues={{ title: title, content: content }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          isMounted={isMounted}
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
        />
      </AppForm>
      <AppButton
        disabled={isDeleting}
        title="delete"
        color="danger"
        onPress={handleDelete}
      />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.medium
  }
})

export default ParentPostForm
