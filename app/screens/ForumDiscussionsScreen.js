import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'
import convertHours from '../utils/convertHours'
import DiscussionItem from '../components/forum/DiscussionItem'
import hoursFromDate from '../utils/hoursFromDate'
import IconButton from '../components/IconButton'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'

const discussionList = [
  {
    _id: 'uhasuhSA123j123jm13',
    title: 'PPE materials',
    author: 'Tobias',
    comments: 1535,
    likes: 3,
    createdAt: new Date('2020-10-01T13:24:59')
  },
  {
    _id: '65a54das654das45d46asd',
    title: 'Experimental medications for COVID',
    author: 'denissw9',
    comments: 15,
    views: 322,
    likes: 54,
    createdAt: new Date('2020-08-01T01:00:16')
  },
  {
    _id: '123jn23m123k123k123n1',
    title: 'Working hours.. and extra compensation?',
    author: 'Tobias',
    comments: 32,
    views: 3222,
    likes: 32,
    createdAt: new Date('2014-01-05T09:24:59')
  },
  {
    _id: '1893ji123129803jm12ik3m',
    title: 'I need to relax and stay with my family!',
    author: 'Mr. Jones',
    comments: 98,
    views: 12300000,
    likes: 155,
    createdAt: new Date('2020-09-11T09:24:59')
  },
  {
    _id: '8asud9n12jn12lk309aswd',
    title: 'What are your biggest concerns right now?',
    author: 'tobias180901',
    comments: 1498568,
    views: 456,
    likes: 1,
    createdAt: new Date('1999-01-05T09:24:59')
  }
]

const ForumDiscussionsScreen = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Forum" />
      <Text style={styles.text}>The Burnout Forum</Text>
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
            elapsedTime={convertHours(hoursFromDate(discussionItem.createdAt))}
            views={discussionItem.views}
            likes={discussionItem.likes}
            comments={discussionItem.comments}
          />
        ))}
      </KeyboardAwareScrollView>
      <View style={styles.newDiscussionButton}>
        <IconButton
          height={60}
          width={60}
          onPress={() => navigation.navigate('NewDiscussionFormScreen')}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={60}
            color={colors.primary}
          />
        </IconButton>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  newDiscussionButton: {
    height: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20
  },
  container: {
    width: '90%',
    alignSelf: 'center'
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
