import React from 'react'
import { View, StyleSheet } from 'react-native'
import Emoji from 'react-native-emoji'

const YouAreFeeling = ({ feelingToday }) => {
  const emojiNames = {
    1: 'sob',
    2: 'sweat',
    3: 'expressionless',
    4: 'slightly_smiling_face',
    5: 'heart_eyes'
  }
  return (
    <View style={styles.container}>
      <Emoji name={emojiNames[feelingToday]} style={styles.emoji} />
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
