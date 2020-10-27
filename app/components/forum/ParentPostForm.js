import React from 'react'
import colors from '../../config/colors'
import AppForm from '../forms/AppForm'
import AppFormField from '../forms/AppFormField'
import * as Yup from 'yup'
import AppButton from '../AppButton'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Your discussion need a title')
    .max(100),
  content: Yup.string()
    .required('Post something...')
    .max(500)
})

const ParentPostForm = ({
  handleSubmit,
  title,
  content,
  contentEl,
  isSubmitting,
  isMounted,
  handleDelete
}) => {
  return (
    <>
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
      <AppButton title="delete" color="danger" onPress={handleDelete} />
    </>
  )
}

export default ParentPostForm
