import React, { useRef } from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import Screen from '../components/Screen'
import { ProfileMenu } from '../components/profile'
import colors from '../config/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DiscussionItem from '../components/forum/DiscussionItem'
import SubmitButton from '../components/forms/SubmitButton'
import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import * as Yup from 'yup'

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
    views: 12300000,
    likes: 155,
    elapsedHours: 500
  },
  {
    _id: '8asud9n12jn12lk309aswd',
    title: 'What are your biggest concerns right now?',
    author: 'tobias180901',
    comments: 1498568,
    views: 456,
    likes: 1,
    elapsedHours: 20000
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
      <Image
        elevation={5}
        source={require('../assets/burnie-logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>The Burnout Forum</Text>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
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
