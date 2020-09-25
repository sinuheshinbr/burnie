import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Card from './Card'

const DataCard = props => {
  const data = {
    labels: [
      '20/09/2020',
      '21/09/2020',
      '22/09/2020',
      '23/09/2020',
      '24/09/2020',
      '25/09/2020'
    ],
    datasets: [
      {
        data: [
          Math.floor(Math.random() * 5) - 2,
          Math.floor(Math.random() * 5) - 2,
          Math.floor(Math.random() * 5) - 2,
          Math.floor(Math.random() * 5) - 2,
          Math.floor(Math.random() * 5) - 2,
          Math.floor(Math.random() * 5) - 2,
          Math.floor(Math.random() * 5) - 2
        ]
      }
    ]
  }

  return (
    <Card title="Your last week">
      <LineChart
        withVerticalLabels={false}
        data={data}
        width={Dimensions.get('window').width * 0.8}
        height={120}
        withVerticalLines={false}
        yLabelsOffset={30}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          // color: (opacity = 1) => `rgba(58, 239, 159, ${1})`,
          color: (opacity = 1) => `rgba(59, 180, 228, ${1})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${0.7})`,
          propsForDots: {
            r: '5'
          }
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 6
        }}
      />
    </Card>
  )
}

export default DataCard
