import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import defaultStyles from '../config/styles'

const AppTextInput = ({ icon, isFocused, ...otherProps }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.focusDisplay,
          {
            backgroundColor: isFocused ? defaultStyles.colors.primary : null
          }
        ]}
      />
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        onFocus={() => setIsFocused(true)}
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  focusDisplay: {
    width: 4,
    height: 55,
    position: 'absolute',
    top: 0
  },
  container: {
    backgroundColor: defaultStyles.colors.transparent,
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  }
})

export default AppTextInput
