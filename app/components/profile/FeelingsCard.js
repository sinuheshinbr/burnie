import React, { useContext } from 'react'

import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'
import Card from './Card'
import EmojiScale from './EmojiScale'
import feelsApi from '../../api/feelings'
import useApi from '../../hooks/useApi'
import YouAreFeeling from './YouAreFeeling'
import ActivitySpinner from '../../components/ActivitySpinner'

const FeelingsCard = ({ todayFeeling, setTodayFeeling, loading }) => {
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user

  const { request: createFeeling } = useApi(feelsApi.createFeeling)

  const selectFeeling = async feeling => {
    const jwt = await authStorage.getToken()
    setTodayFeeling(feeling)
    createFeeling(_id, feeling, jwt)
  }

  return (
    <Card
      title={
        loading
          ? 'Please wait...'
          : todayFeeling
          ? 'Today you are:'
          : 'How are you feeling today?'
      }
    >
      {loading && <ActivitySpinner />}
      {!loading && !todayFeeling && (
        <EmojiScale selectFeeling={selectFeeling} />
      )}
      {!loading && todayFeeling && (
        <YouAreFeeling todayFeeling={todayFeeling} />
      )}
    </Card>
  )
}

export default FeelingsCard
