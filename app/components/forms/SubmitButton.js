import React from 'react'
import { useFormikContext } from 'formik'

import AppButton from '../AppButton'

const SubmitButton = ({ title, color, width, disabled }) => {
  const { handleSubmit } = useFormikContext()
  return (
    <AppButton
      disabled={disabled}
      width={width}
      title={title}
      color={color}
      onPress={handleSubmit}
    />
  )
}

export default SubmitButton
