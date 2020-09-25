import React from 'react'
import EmojiScale from './EmojiScale'
import { Card } from './'

const FeelingsCard = () => {
  return (
    <Card title="How are you feeling today?">
      <EmojiScale />
    </Card>
  )
}

export default FeelingsCard
