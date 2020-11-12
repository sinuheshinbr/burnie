import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import feelingsApi from '../api/feelings'
import postsApi from '../api/posts'
import likesApi from '../api/likes'
import dayjs from 'dayjs'
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
import addLikesToPosts from '../utils/addLikesToPosts'

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])
  const [todayFeeling, setTodayFeeling] = useState()
  const [lastWeekFeelings, setLastWeekFeelings] = useState([])
  const [lastMonthFeelings, setLastMonthFeelings] = useState([])
  const [
    lastMonthContributionFeelings,
    setLastMonthContributionFeelings
  ] = useState()
  const [hideWeekPointsAtIndex, setHideWeekPointsAtIndex] = useState([])
  const [hideMonthPointsAtIndex, setHideMonthPointsAtIndex] = useState([])
  const defaultImage = require('../assets/image-placeholder.png')
  const { user } = useContext(AuthContext)
  const { _id, name, occupation, city, avatarUrl } = user

  const getFeelings = useApi(feelingsApi.getFeelings)
  const getPosts = useApi(postsApi.getPosts)
  const getLikes = useApi(likesApi.getLikes)

  const onLoad = async () => {
    setRefreshing(true)
    const jwt = await authStorage.getToken()

    const feelingsResponse = await getFeelings.request(_id, jwt)
    if (feelingsResponse?.ok) {
      const feelings = feelingsResponse.data.json.map(daily => ({
        feeling: daily.feeling,
        date: dayjs(daily.date).format('DD-MM-YYYY')
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
    }

    const postsResponse = await getPosts.request(_id, jwt, 'all', 30)
    const likesResponse = await getLikes.request(_id, jwt)
    if (postsResponse?.ok && likesResponse?.ok) {
      const postsWithLikes = addLikesToPosts(
        postsResponse,
        likesResponse,
        null,
        true
      )

      setPosts(postsWithLikes)
    }

    setRefreshing(false)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Screen style={styles.screen}>
      <ProfileMenu displayBack={false} path="Home" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onLoad} />
        }
      >
        <View style={styles.profile}>
          <Profile
            onPress={() => navigation.navigate('ConfigurationScreen')}
            name={name ? name : 'Username'}
            occupation={occupation ? occupation : 'Occupation'}
            city={city ? city : 'City'}
            image={avatarUrl ? { uri: avatarUrl } : defaultImage}
          />
        </View>
        <FeelingsCard
          loading={refreshing}
          todayFeeling={todayFeeling}
          setTodayFeeling={setTodayFeeling}
        />
        <DataCard
          todayFeeling={todayFeeling}
          lastMonthContributionFeelings={lastMonthContributionFeelings}
          pages={3}
          hideMonthPointsAtIndex={hideMonthPointsAtIndex}
          hideWeekPointsAtIndex={hideWeekPointsAtIndex}
          loading={refreshing}
          lastWeekFeelings={lastWeekFeelings}
          lastMonthFeelings={lastMonthFeelings}
        />
        <ForumCard
          userId={_id}
          onPress={() => navigation.navigate('ForumDiscussionsScreen', {})}
          loading={refreshing}
          posts={posts}
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
