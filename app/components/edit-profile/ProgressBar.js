import React from 'react'
import { View, StyleSheet } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import colors from '../../config/colors'

const AppProgressBar = ({ progress = 0, visible = false }) => {
  return (
    <View style={styles.container}>
      {visible && (
        <ProgressBar color={colors.secondary} progress={progress} width={150} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15
  }
})

export default AppProgressBar
