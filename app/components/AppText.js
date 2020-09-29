import React from 'react'
import { Text } from 'react-native'

import defaultStyles from '../config/styles'

const AppText = ({ children, style, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[defaultStyles.text, style]}>
      {children}
    </Text>
  )
}

export default AppText
