import React, { useState, useContext } from 'react'

import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'
import Card from './Card'
import EmojiScale from './EmojiScale'
import feelsApi from '../../api/feels'
import useApi from '../../hooks/useApi'
import YouAreFeeling from './YouAreFeeling'

const FeelingsCard = () => {
  const [feelingToday, setFeelingToday] = useState(null)
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user

  const { request: createFeel, error } = useApi(feelsApi.createFeel)

  const selectFeeling = async feeling => {
    const jwt = await authStorage.getToken()
    setFeelingToday(feeling)
    createFeel(_id, feeling, jwt)
  }

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
