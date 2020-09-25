import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'

const AppFormField = ({ name, ...otherProps }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <>
      <AppTextInput
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setFieldTouched(name)
          setIsFocused(false)
        }}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormField
