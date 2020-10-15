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

const HomeScreen = ({ navigation }) => {
  const [todayFeeling, setTodayFeeling] = useState()
  const [loadingToday, setLoadingToday] = useState(true)
  const defaultImage = require('../assets/image-placeholder.png')
  const { user } = useContext(AuthContext)
  const { _id, name, occupation, city, avatarUrl } = user

  const { request: getFeelings } = useApi(feelingsApi.getFeelings)

  const onLoad = async () => {
    const jwt = await authStorage.getToken()
    const response = await getFeelings(_id, jwt)
    if (!response?.ok) return
    setLoadingToday(false)

    const feelings = response.data.map(daily => ({
      feeling: daily.feeling,
      elapsedDays: moment().diff(new Date(daily.date), 'days')
    }))

    const todayFeelingObject = feelings.filter(object => {
      return object.elapsedDays === 0
    })

    if (todayFeelingObject[0]?.feeling)
      setTodayFeeling(todayFeelingObject[0].feeling)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Home" />
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
          loading={loadingToday}
          todayFeeling={todayFeeling}
          setTodayFeeling={setTodayFeeling}
        />
        <DataCard />
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
