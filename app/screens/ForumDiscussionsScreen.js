import React, { useRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import Screen from '../components/Screen'
import { ProfileMenu } from '../components/profile'
import colors from '../config/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DiscussionItem from '../components/forum/DiscussionItem'
import SubmitButton from '../components/forms/SubmitButton'
import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import * as Yup from 'yup'
import convertHours from '../utils/convertHours'
import hoursFromDate from '../utils/hoursFromDate'

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

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Your discussion need a title')
    .max(100),
  content: Yup.string()
    .required('Post something...')
    .max(500)
})

const ForumDiscussionsScreen = props => {
  const contentEl = useRef(null)
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
        <Text style={styles.text}>New Discussion: </Text>
        <AppForm
          style={styles.form}
          initialValues={{ title: '', content: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            backgroundColor={colors.transparent02}
            name="title"
            autoCapitalize="none"
            placeholder="Give this discussion a title"
            autoCorrect={false}
            textContentType="none"
            textColor={colors.dark}
            nextEl={contentEl}
          />
          <AppFormField
            innerRef={contentEl}
            backgroundColor={colors.transparent02}
            name="content"
            autoCapitalize="none"
            placeholder="Write your post here"
            autoCorrect={false}
            textContentType="none"
            numberOfLines={4}
            textAlignVertical="top"
            bigFocusDisplay
            textColor={colors.dark}
            multiline
            isLast
          />
          <SubmitButton
            onPress={() => console.log('create new discussion')}
            title="Publish"
          />
        </AppForm>
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
