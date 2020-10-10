import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../../config/colors'

const Dot = ({ isActive }) => {
  return (
    <Entypo
      name="dot-single"
      size={35}
      color={isActive ? colors.medium : colors.light}
      style={{ marginLeft: -23 }}
    />
  )
}

const ChartPageIndicator = ({ pages, currentPage }) => {
  const dots = []
  let isActive = false
  for (let i = 0; i < pages; i++) {
    if (currentPage === i + 1) isActive = true
    dots.push(<Dot isActive={isActive} />)
    isActive = false
  }
  return <View style={styles.container}>{dots}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end'
  }
})

export default ChartPageIndicator
