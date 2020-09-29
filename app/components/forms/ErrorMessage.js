import React from 'react'

import AppText from '../AppText'

const ErrorMessage = ({ error, visible, errorColor = 'red' }) => {
  if (!visible || !error) return null
  return <AppText style={{ color: errorColor }}>{error}</AppText>
}

export default ErrorMessage
