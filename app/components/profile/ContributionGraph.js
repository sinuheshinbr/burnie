import React from 'react'
import { Dimensions } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit'

import ActivitySpinner from '../ActivitySpinner'
import Card from './Card'
import ChartPageIndicator from './ChartPageIndicator'

const AppContributionGraph = ({
  title,
  pages,
  currentPage,
  loading,
  data = [],
  todayFeeling
}) => {
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255,82,82, ${opacity})`
  }

  if (todayFeeling)
    data = [
      ...data,
      {
        count: 4 - todayFeeling,
        date: new Date()
      }
    ]

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
        <ContributionGraph
          horizontal={false}
          squareSize={30}
          style={{ transform: [{ translateY: +10 }] }}
          showMonthLabels={false}
          values={data}
          endDate={new Date()}
          numDays={30}
          width={Dimensions.get('window').width * 0.85}
          height={190}
          chartConfig={chartConfig}
        />
      )}
    </Card>
  )
}

export default AppContributionGraph
