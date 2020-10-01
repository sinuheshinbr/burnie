import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Card from './Card'

const Chart = ({ data, title }) => {
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
        width={Dimensions.get('window').width * 0.8}
        height={180}
        chartConfig={chartConfig}
        bezier
      />
    </Card>
  )
}

export default Chart
