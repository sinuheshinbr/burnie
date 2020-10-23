import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import ActivitySpinner from '../ActivitySpinner'
import Card from './Card'
import ChartPageIndicator from './ChartPageIndicator'
import colors from '../../config/colors'

const Chart = ({
  data,
  title,
  pages,
  currentPage,
  loading,
  dotSize = 5,
  hidePointsAtIndex,
  todayFeeling
}) => {
  if (data && todayFeeling) data = [...data, todayFeeling]
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(59, 180, 228, ${1})`,
    strokeWidth: 0.00001,
    propsForDots: {
      r: dotSize
    }
  }

  const getDotColor = dataPoint => {
    if (dataPoint > 2) return colors.primary
    if (dataPoint === 2) return colors.secondary
    return colors.danger
  }

  return (
    <Card
      width={`${(100 / pages) * 0.9}%`}
      marginRight={`${(100 / pages) * 0.05}%`}
      marginLeft={`${(100 / pages) * 0.05}%`}
      title={loading ? 'Please wait...' : title}
    >
      <ChartPageIndicator pages={pages} currentPage={currentPage} />
      {loading && <ActivitySpinner height={190} />}
      {!loading && (
        <LineChart
          getDotColor={getDotColor}
          withShadow={false}
          hidePointsAtIndex={hidePointsAtIndex}
          style={{ transform: [{ translateX: -20 }] }}
          withVerticalLines={false}
          withHorizontalLabels={true}
          withVerticalLabels={false}
          data={{ datasets: [{ data }] }}
          formatYLabel={y => {
            if (y == 4) return '😍'
            if (y == 3) return '🙂'
            if (y == 2) return '😑'
            if (y == 1) return '🙁'
            if (y == 0) return '😭'
            return ''
          }}
          width={Dimensions.get('window').width * 0.85}
          height={190}
          chartConfig={chartConfig}
          bezier
        />
      )}
    </Card>
  )
}

export default Chart
