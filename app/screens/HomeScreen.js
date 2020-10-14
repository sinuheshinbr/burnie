import React, { useContext, useState } from 'react'
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
import AuthContext from '../auth/context'

const HomeScreen = ({ navigation }) => {
  const defaultImage = require('../assets/image-placeholder.png')
  const { user } = useContext(AuthContext)
  const { name, occupation, city, avatarUrl } = user
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
            name={name ? name : 'Username'}
            occupation={occupation ? occupation : 'Occupation'}
            city={city ? city : 'City'}
            image={{
              uri: avatarUrl ? `${avatarUrl}?${Math.random()}` : defaultImage
            }}
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
