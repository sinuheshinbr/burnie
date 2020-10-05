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
  width = '100%'
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors[color], width }]}
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
    height: 40,
    borderRadius: 20,
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
