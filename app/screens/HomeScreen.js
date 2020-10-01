import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'

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
        <View style={styles.profile}>
          <Profile
            name="Mosh Hamedani lets try a very big name"
            occupation="Neurosurgeon"
            city="São Paulo"
            image={require('../assets/mosh.jpg')}
          />
        </View>
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
  profile: {
    alignSelf: 'center'
  },
  screen: {
    backgroundColor: colors.light
  }
})

export default HomeScreen
