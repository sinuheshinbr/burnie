import React from 'react'
import {
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  View
} from 'react-native'
import colors from '../config/colors'

const AppButton = ({
  title,
  textColor = colors.white,
  onPress,
  color = 'secondary',
  children,
  width = '100%',
  borderWidth = 0,
  borderColor,
  disabled
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? colors[color + 'Disabled']
            : colors[color],
          width,
          borderWidth,
          borderColor
        }
      ]}
    >
      <View style={styles.container}>
        {children}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row'
  },
  text: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 2,
    marginLeft: 10
  }
})

export default AppButton
