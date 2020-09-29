import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Screen from '../components/Screen'
import { ProfileMenu } from '../components/profile'
import colors from '../config/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SubmitButton from '../components/forms/SubmitButton'
import PostItem from '../components/forum/PostItem'
import AppForm from '../components/forms/AppForm'
import AppFormField from '../components/forms/AppFormField'
import * as Yup from 'yup'

const discussion = [
  {
    _id: 'uhasuhSA123j123jm13',
    title: 'PPE materials',
    author: 'Tobias',
    content:
      'At the beginning of the COVID 19 pandemic many hospitals were lacking of personal protection equipment. Here, the situation is currently improving. How is the situation in your country? '
  }
]

const postList = [
  {
    _id: 'uh2u13hi1u23hiu1h31n3mnsa',
    discussionId: 'uhasuhSA123j123jm13',
    author: 'philippa schwartz',
    elapsedHours: 1.1,
    content:
      "We're still struggling in UK - some parts are dealing better than others - but it is not a problem that is solved completely."
  },
  {
    _id: '99uasd90dsafiawe23k',
    discussionId: 'uhasuhSA123j123jm13',
    author: 'david298b',
    elapsedHours: 50,
    content:
      "Yeah we get times when we're doing just about ok...but then we're really low on stock again"
  },
  {
    _id: '8899UACJI12jkjk342m21k3',
    discussionId: 'uhasuhSA123j123jm13',
    author: 'pedrosantos',
    elapsedHours: 500,
    content:
      'In the beginning we had stop performing elective surgeries, here in Brazil. However in the last 1 month or so things have gone back to normal. '
  },
  {
    _id: '98ASUJN123JMsd9a8ujadsk',
    discussionId: 'uhasuhSA123j123jm13',
    author: 'Julia_32',
    elapsedHours: 1500,
    content:
      'We had huge issue in the beginning of the pandemic, however we were lucky and stopped the first wave early. However, we are at the beginning the second wave right now and seeing a huge flow of patients. No issues with PPE right now. However, some of the material is of really bad quality. '
  },
  {
    _id: '8jasdjansd98h92çkldmalsmd09',
    discussionId: 'uhasuhSA123j123jm13',
    author: 'brad-mar',
    elapsedHours: 50000,
    content:
      'Oh yes. Huge problem here. No appropriate PPE, we have to use the same material for a very long time. '
  }
]

const validationSchema = Yup.object().shape({
  post: Yup.string()
    .required('Post something...')
    .max(500)
})

const ForumPostScreen = props => {
  return (
    <Screen style={styles.screen}>
      <ProfileMenu path={`Forum > ${discussion[0].title}`} />
      <Text style={styles.title}>{discussion[0].title}</Text>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <AppForm
          style={styles.form}
          initialValues={{ post: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            backgroundColor={colors.transparent02}
            name="post"
            autoCapitalize="none"
            placeholder="Write a comment... "
            autoCorrect={false}
            textContentType="none"
            numberOfLines={4}
            textAlignVertical="top"
            disableFocusDisplay
            textColor={colors.dark}
            multiline
            isLast
          />
          <SubmitButton
            onPress={() => console.log('create new discussion')}
            title="Publish"
          />
        </AppForm>
        {postList.map(post => (
          <PostItem
            key={post._id}
            author={post.author}
            _id={post._id}
            content={post.content}
            elapsedHours={post.elapsedHours}
          />
        ))}
      </KeyboardAwareScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
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
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: 20,
    marginBottom: 10
  }
})

export default ForumPostScreen
