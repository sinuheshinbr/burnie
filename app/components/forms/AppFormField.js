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
  isMounted,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    submitForm,
    values
  } = useFormikContext()
  return (
    <>
      <AppTextInput
        value={values[name]}
        disableFocusDisplay={disableFocusDisplay}
        nextEl={nextEl}
        textColor={textColor}
        innerRef={innerRef}
        isFocused={isFocused}
        onFocus={() => {
          if (isMounted) setIsFocused(true)
        }}
        onBlur={() => {
          if (isMounted) {
            setFieldTouched(name)
            setIsFocused(false)
          }

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
