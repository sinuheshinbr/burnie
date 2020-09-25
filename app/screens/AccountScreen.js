import React from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from '../components/Screen'
import colors from '../config/colors'
import Profile from '../components/profile/Profile'
import ProfileMenu from '../components/profile/ProfileMenu'

const AccountScreen = () => {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ProfileMenu />
        <Profile
          title="Mosh Hamedani"
          occupation="Neurosurgeon"
          city="São Paulo"
          image={require('../assets/mosh.jpg')}
        />
      </View>
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
