import React from 'react'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'

const ActivitySpinner = ({ visible = true, height = 80 }) => {
  if (!visible) return null
  return (
    <View style={{ height, justifyContent: 'center' }}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 80,
          height: 80,
          alignSelf: 'center',
          justifyContent: 'center'
        }}
        source={require('../assets/animations/smallSpinner.json')}
      />
    </View>
  )
}

export default ActivitySpinner
