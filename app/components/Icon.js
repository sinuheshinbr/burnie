import React from 'react'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MenuItem = ({
  name,
  backgroundColor = '#000',
  iconColor = '#fff',
  onPress,
  icon,
  size = 40
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View>
        <MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
      </View>
    </View>
  )
}

export default MenuItem
