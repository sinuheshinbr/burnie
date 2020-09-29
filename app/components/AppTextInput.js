import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from '../config/styles'

const AppTextInput = ({
  backgroundColor = defaultStyles.colors.transparent02,
  disableFocusDisplay,
  icon,
  iconColor = defaultStyles.colors.medium,
  innerRef,
  isFocused,
  nextEl,
  textColor = defaultStyles.colors.white,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View
        style={[
          styles.focusDisplay,
          {
            backgroundColor: disableFocusDisplay
              ? null
              : isFocused
              ? defaultStyles.colors.primary
              : null
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
        numberOfLines={4}
        onFocus={() => setIsFocused(true)}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.text, { color: textColor }]}
        {...otherProps}
        onSubmitEditing={() => {
          if (nextEl) nextEl.current.focus()
        }}
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
