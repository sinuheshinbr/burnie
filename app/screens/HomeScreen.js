import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import feelingsApi from '../api/feelings'
import moment from 'moment'
import {
  Profile,
  ProfileMenu,
  FeelingsCard,
  DataCard,
  ForumCard
} from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import getFeelingsFrom from '../utils/getFeelingsFrom'

const HomeScreen = ({ navigation }) => {
  const [todayFeeling, setTodayFeeling] = useState()
  const [lastWeekFeelings, setLastWeekFeelings] = useState()
  const [lastMonthFeelings, setLastMonthFeelings] = useState()
  const [
    lastMonthContributionFeelings,
    setLastMonthContributionFeelings
  ] = useState()
  const [loadingFeelings, setLoadingFeelings] = useState(true)
  const [hideWeekPointsAtIndex, setHideWeekPointsAtIndex] = useState([])
  const [hideMonthPointsAtIndex, setHideMonthPointsAtIndex] = useState([])
  const defaultImage = require('../assets/image-placeholder.png')
  const { user } = useContext(AuthContext)
  const { _id, name, occupation, city, avatarUrl } = user

  const { request: getFeelings } = useApi(feelingsApi.getFeelings)

  const onLoad = async () => {
    const jwt = await authStorage.getToken()
    const response = await getFeelings(_id, jwt)
    if (!response?.ok) return

    const feelings = response.data.map(daily => ({
      feeling: daily.feeling,
      date: moment(daily.date).format('DD-MM-YYYY')
    }))

    setTodayFeeling(getFeelingsFrom.today(feelings))

    setLastWeekFeelings(
      getFeelingsFrom.lastPeriod(feelings, 7).lastPeriodFeelings
    )

    setHideWeekPointsAtIndex(
      getFeelingsFrom.lastPeriod(feelings, 7).emptyIndexes
    )

    setLastMonthFeelings(
      getFeelingsFrom.lastPeriod(feelings, 30).lastPeriodFeelings
    )

    setLastMonthContributionFeelings(
      getFeelingsFrom.lastPeriod(feelings, 30, true)
    )

    setHideMonthPointsAtIndex(
      getFeelingsFrom.lastPeriod(feelings, 30).emptyIndexes
    )

    setLoadingFeelings(false)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Screen style={styles.screen}>
      <ProfileMenu displayBack={false} path="Home" />
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <Profile
            name={name ? name : 'Username'}
            occupation={occupation ? occupation : 'Occupation'}
            city={city ? city : 'City'}
            image={avatarUrl ? { uri: avatarUrl } : defaultImage}
          />
        </View>
        <FeelingsCard
          loading={loadingFeelings}
          todayFeeling={todayFeeling}
          setTodayFeeling={setTodayFeeling}
        />
        <DataCard
          lastMonthContributionFeelings={lastMonthContributionFeelings}
          pages={3}
          hideMonthPointsAtIndex={hideMonthPointsAtIndex}
          hideWeekPointsAtIndex={hideWeekPointsAtIndex}
          loading={loadingFeelings}
          lastWeekFeelings={lastWeekFeelings}
          lastMonthFeelings={lastMonthFeelings}
        />
        <ForumCard
          onPress={() => navigation.navigate('ForumDiscussionsScreen')}
        />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  profile: {
    alignSelf: 'center'
  },
  screen: {
    backgroundColor: colors.light
  }
})

export default HomeScreen
