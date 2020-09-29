import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import Screen from '../components/Screen'
import { ProfileMenu } from '../components/profile'
import colors from '../config/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AppButton from '../components/AppButton'
import DiscussionItem from '../components/forum/DiscussionItem'

const discussionList = [
  {
    _id: 'uhasuhSA123j123jm13',
    title: 'PPE materials',
    author: 'Tobias',
    comments: 1535,
    likes: 3,
    elapsedHours: 1
  },
  {
    _id: '65a54das654das45d46asd',
    title: 'Experimental medications for COVID',
    author: 'denissw9',
    comments: 15,
    views: 322,
    likes: 54,
    elapsedHours: 25
  },
  {
    _id: '123jn23m123k123k123n1',
    title: 'Working hours.. and extra compensation?',
    author: 'Tobias',
    comments: 32,
    views: 3222,
    likes: 32,
    elapsedHours: 5000
  },
  {
    _id: '1893ji123129803jm12ik3m',
    title: 'I need to have sex!',
    author: 'Mr. Jones',
    comments: 98,
    views: 3222,
    likes: 155,
    elapsedHours: 500
  },
  {
    _id: '8asud9n12jn12lk309aswd',
    title: 'What are your biggest concerns right now?',
    author: 'tobias180901',
    comments: 123,
    views: 456,
    likes: 1,
    elapsedHours: 20000
  }
]

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
        {discussionList.map(discussionItem => (
          <DiscussionItem
            key={discussionItem._id}
            title={discussionItem.title}
            author={discussionItem.author}
            _id={discussionItem._id}
            elapsedHours={discussionItem.elapsedHours}
            views={discussionItem.views}
            likes={discussionItem.likes}
            comments={discussionItem.comments}
          />
        ))}
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
