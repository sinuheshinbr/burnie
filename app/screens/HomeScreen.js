import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from '../components/Screen'
import colors from '../config/colors'
import {
  Profile,
  ProfileMenu,
  FeelingsCard,
  DataCard,
  ForumCard
} from '../components/profile'

const HomeScreen = ({ navigation }) => {
  const [feelingToday, setFeelingToday] = useState(null)

  const selectFeeling = feeling => {
    setFeelingToday(feeling)
  }

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Home" />
      <ScrollView style={styles.container}>
        <Profile
          name="Mosh Hamedani"
          occupation="Neurosurgeon"
          city="São Paulo"
          image={require('../assets/mosh.jpg')}
        />
        <FeelingsCard
          feelingToday={feelingToday}
          selectFeeling={selectFeeling}
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
  container: {},
  screen: {
    backgroundColor: colors.light
  }
})

export default HomeScreen
