import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Emoji from 'react-native-emoji'

const EmojiScale = ({ selectFeeling }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => selectFeeling('0')}
        style={styles.button}
      >
        <Emoji name="sob" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectFeeling('1')}
        style={styles.button}
      >
        <Emoji name="sweat" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectFeeling('2')}
        style={styles.button}
      >
        <Emoji name="expressionless" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectFeeling('3')}
        style={styles.button}
      >
        <Emoji name="slightly_smiling_face" style={styles.emoji} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectFeeling('4')}
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
