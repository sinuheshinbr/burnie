import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Card from './Card'
import colors from '../../config/colors'

const Chart = ({ data, title, canScrollRight, canScrollLeft }) => {
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(59, 180, 228, ${1})`,
    useShadowColorFromDataset: true
  }

  return (
    <Card width="45%" marginRight="2.5%" marginLeft="2.5%" title={title}>
      {canScrollRight && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={35}
          color={colors.medium}
          style={styles.iconRight}
        />
      )}
      {canScrollLeft && (
        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
          color={colors.medium}
          style={styles.iconLeft}
        />
      )}
      <LineChart
        withVerticalLines={false}
        withHorizontalLabels={true}
        withVerticalLabels={false}
        data={{ datasets: [{ data }] }}
        formatYLabel={x => {
          if (x == 4) return '😍'
          if (x == 3) return '🙂'
          if (x == 2) return '😑'
          if (x == 1) return '🙁'
          if (x == 0) return '😭'
          return ''
        }}
        width={Dimensions.get('window').width * 0.75}
        height={180}
        chartConfig={chartConfig}
        bezier
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  iconRight: {
    position: 'absolute',
    top: '45%',
    left: '95%'
  },
  iconLeft: {
    position: 'absolute',
    top: '45%'
  }
})

export default Chart
