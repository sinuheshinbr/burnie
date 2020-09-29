import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'

const AppFormField = ({
  name,
  textColor,
  errorColor,
  nextEl,
  innerRef,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <>
      <AppTextInput
        textColor={textColor}
        innerRef={innerRef}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setFieldTouched(name)
          setIsFocused(false)
          if (nextEl) nextEl.current.focus()
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
