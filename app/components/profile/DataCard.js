import React from 'react'
import { ScrollView } from 'react-native'
import Chart from './Chart'
import ContributionGraph from './ContributionGraph'

const DataCard = ({
  todayFeeling,
  lastWeekFeelings,
  loading,
  hideWeekPointsAtIndex,
  lastMonthFeelings,
  hideMonthPointsAtIndex,
  pages = 1,
  lastMonthContributionFeelings
}) => {
  const containerWidth = {
    width: `${pages * 100}%`
  }

  return (
    <ScrollView
      horizontal={true}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
      contentContainerStyle={containerWidth}
      showsHorizontalScrollIndicator={false}
    >
      <Chart
        todayFeeling={todayFeeling}
        hidePointsAtIndex={hideWeekPointsAtIndex}
        loading={loading}
        pages={pages}
        currentPage={1}
        title="Your Last Week"
        data={lastWeekFeelings}
        dotSize={7}
      />
      <Chart
        todayFeeling={todayFeeling}
        hidePointsAtIndex={hideMonthPointsAtIndex}
        loading={loading}
        pages={pages}
        currentPage={2}
        title="Your Last Month"
        data={lastMonthFeelings}
      />
      <ContributionGraph
        todayFeeling={todayFeeling}
        loading={loading}
        pages={pages}
        currentPage={3}
        title="Your Last Month"
        data={lastMonthContributionFeelings}
      />
    </ScrollView>
  )
}

export default DataCard
