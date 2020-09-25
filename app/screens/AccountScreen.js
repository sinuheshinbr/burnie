import React from 'react'
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

const AccountScreen = () => {
  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.container}>
        <ProfileMenu />
        <Profile
          title="Mosh Hamedani"
          occupation="Neurosurgeon"
          city="São Paulo"
          image={require('../assets/mosh.jpg')}
        />
        <FeelingsCard />
        <DataCard />
        <ForumCard />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  screen: {
    backgroundColor: colors.light
  }
})

export default AccountScreen
