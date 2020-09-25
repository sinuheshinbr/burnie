import React from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import Emoji from 'react-native-emoji'

const EmojiScale = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={styles.button}
      >
        <Emoji name="sob" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={styles.button}
      >
        <Emoji name="sweat" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={styles.button}
      >
        <Emoji name="expressionless" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={styles.button}
      >
        <Emoji name="slightly_smiling_face" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={styles.button}
      >
        <Emoji name="heart_eyes" style={styles.emoji} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  emoji: {
    fontSize: 30
  }
})

export default EmojiScale
