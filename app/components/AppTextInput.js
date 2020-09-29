import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from '../config/styles'

const AppTextInput = ({
  icon,
  textColor = defaultStyles.colors.white,
  innerRef,
  iconColor = defaultStyles.colors.medium,
  isFocused,
  backgroundColor = defaultStyles.colors.transparent02,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
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
          color={iconColor}
          style={styles.icon}
        />
      )}
      <TextInput
        ref={innerRef}
        onFocus={() => setIsFocused(true)}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.text, { color: textColor }]}
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
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  },
  text: {
    flex: 1
  }
})

export default AppTextInput
