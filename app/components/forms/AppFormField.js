import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'

const AppFormField = ({
  disableFocusDisplay,
  errorColor,
  innerRef,
  isLast,
  name,
  nextEl,
  textColor,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    submitForm
  } = useFormikContext()
  return (
    <>
      <AppTextInput
        disableFocusDisplay={disableFocusDisplay}
        nextEl={nextEl}
        textColor={textColor}
        innerRef={innerRef}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setFieldTouched(name)
          setIsFocused(false)

          if (isLast) submitForm()
        }}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage
        errorColor={errorColor}
        error={errors[name]}
        visible={touched[name]}
      />
    </>
  )
}

export default AppFormField
