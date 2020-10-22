import React from 'react'
import { View, StyleSheet } from 'react-native'
import Emoji from 'react-native-emoji'

const YouAreFeeling = ({ todayFeeling }) => {
  const emojiNames = {
    '0': 'sob',
    '1': 'sweat',
    '2': 'expressionless',
    '3': 'slightly_smiling_face',
    '4': 'heart_eyes'
  }
  return (
    <View style={styles.container}>
      <Emoji name={emojiNames[todayFeeling]} style={styles.emoji} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  emoji: {
    fontSize: 30
  }
})

export default YouAreFeeling
