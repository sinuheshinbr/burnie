import React from 'react'
import EmojiScale from './EmojiScale'
import Card from './Card'
import YouAreFeeling from './YouAreFeeling'

const FeelingsCard = ({ feelingToday, selectFeeling }) => {
  return (
    <Card
      title={feelingToday ? 'Today you are:' : 'How are you feeling today?'}
    >
      {!feelingToday && <EmojiScale selectFeeling={selectFeeling} />}
      {feelingToday && <YouAreFeeling feelingToday={feelingToday} />}
    </Card>
  )
}

export default FeelingsCard
