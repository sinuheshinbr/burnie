import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import colors from '../../config/colors'
import defaultStyles from '../../config/styles'

const EditDetailsInput = ({ isFocused, setIsFocused, ...otherProps }) => {
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
  container: {
    borderBottomColor: colors.dark,
    borderBottomWidth: 1,
    width: '100%'
  }
})

export default EditDetailsInput
