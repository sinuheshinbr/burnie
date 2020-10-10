import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../../config/colors'

const Dot = ({ isDark }) => {
  return (
    <Entypo
      name="dot-single"
      size={35}
      color={isDark ? colors.dark : colors.medium}
      style={{ marginLeft: -23 }}
    />
  )
}

const ChartPageIndicator = ({ pages, currentPage }) => {
  const dots = []
  let isDark = false
  for (let i = 0; i < pages; i++) {
    if (currentPage === i + 1) isDark = true
    dots.push(
      <React.Fragment key={i}>
        <Dot isDark={isDark} />
      </React.Fragment>
    )
    isDark = false
  }
  return <View style={styles.container}>{dots}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    top: '90%'
  }
})

export default ChartPageIndicator
