import React from 'react'
import { ScrollView } from 'react-native'
import Chart from './Chart'

const DataCard = props => {
  const week = [...new Array(7)].map(() => Math.floor(Math.random() * 5))
  const month = [...new Array(30)].map(() => Math.floor(Math.random() * 5))

  return (
    <ScrollView
      horizontal={true}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
      contentContainerStyle={{ width: '200%' }}
    >
      <Chart pages={2} currentPage={1} title="Your Last Week" data={week} />
      <Chart pages={2} currentPage={2} title="Your Last Month" data={month} />
    </ScrollView>
  )
}

export default DataCard
