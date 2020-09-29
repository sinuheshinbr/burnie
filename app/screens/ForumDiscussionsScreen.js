import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import Screen from '../components/Screen'
import { ProfileMenu } from '../components/profile'
import colors from '../config/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppButton from '../components/AppButton'
import DiscussionItem from '../components/forum/DiscussionItem'

const ForumDiscussionsScreen = props => {
  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Forum" />
      <Image
        elevation={5}
        source={require('../assets/burnie-logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>The Burnout Forum</Text>
      <View style={styles.button}>
        <AppButton
          onPress={() => console.log('create new discussion')}
          title="+ New Discussion"
        />
      </View>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <DiscussionItem
          title="PPE materials"
          author="Tobias"
          onPress={() => console.log('open discussion')}
          comments={5}
          likes={3}
        />
        <DiscussionItem
          title="Experimental medications for COVID"
          author="denissw9"
          onPress={() => console.log('open discussion')}
        />
        <DiscussionItem
          title="Working hours.. and extra compensation?"
          author="Tobias"
          onPress={() => console.log('open discussion')}
        />
        <DiscussionItem
          title="What are your biggest concerns right now?"
          author="tobias180901"
          onPress={() => console.log('open discussion')}
        />
      </KeyboardAwareScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 30
  },
  image: {
    marginTop: 30,
    width: 70,
    height: 70,
    alignSelf: 'center'
  },
  screen: {
    backgroundColor: colors.light
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: 20
  }
})

export default ForumDiscussionsScreen
