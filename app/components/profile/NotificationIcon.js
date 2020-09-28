import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const EmojiScale = () => {
  return (
    <TouchableOpacity
      onPress={() => console.log('pressed')}
      style={styles.button}
    >
      <Emoji name="sob" style={styles.emoji} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center'
  }
})

export default EmojiScale
