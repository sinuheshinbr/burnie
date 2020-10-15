import React from 'react'
import LottieView from 'lottie-react-native'

const ActivitySpinner = ({ visible = true }) => {
  if (!visible) return null
  return (
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
  )
}

export default ActivitySpinner
