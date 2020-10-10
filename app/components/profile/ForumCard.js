import React from 'react'
import Card from './Card'
import Post from './Post'
import { Text, StyleSheet } from 'react-native'
import ListItemSeparator from '../ListItemSeparator'
import colors from '../../config/colors'
import hoursFromDate from '../../utils/hoursFromDate'
import convertHours from '../../utils/convertHours'
import { useNavigation } from '@react-navigation/native'

const posts = [
  {
    _id: '89hasdeu9as98hdasjda',
    createdAt: new Date('2020-10-01T16:05:00'),
    title: 'Experimental medications for COVID',
    content:
      "I think you need to be passionate about this job if you wanna make it work. Can't think about everything you are giving up or it will not make sense. If you truly love it then I think there is not better reward in life",
    authorAvatarUrl: require('../../assets/rudy.jpg')
  },
  {
    _id: '8aswnoasd98hasdkasd089jasd',
    createdAt: new Date('2020-09-28T09:32:56'),
    title: 'Experimental medications for COVID',
    content:
      "I doubt that closing my eyes and thinking about buddah will make any difference... You say that because you are a neurosurgeon, you don't work at the ER... not so easy to sleep after 10 hours operating a patient and losing him in the morning",
    authorAvatarUrl: require('../../assets/sinuhe.jpg')
  },
  {
    _id: '8hj12jokn231nkl23klçjasd08as',
    createdAt: new Date('2020-09-20T22:19:17'),
    title: 'Experimental medications for COVID',
    content:
      "Hey, I think you guys are too young and don't know how to deal with it yet. Just try mindfulness meditation and ioga practices, it really helps",
    authorAvatarUrl: require('../../assets/mosh.jpg')
  },
  {
    _id: '89hjsadnodwq8jw8idkqwdem9qwd',
    createdAt: new Date('2020-08-01T13:24:59'),
    title: 'Experimental medications for COVID',
    content:
      'Yeah, thats sooo true... I wish I had more time to go rock climbing. I think somethimes this job takes me away from my sanity',
    authorAvatarUrl: require('../../assets/rudy.jpg')
  },
  {
    _id: '9asxdkoasd90juasdmklçmasd09',
    createdAt: new Date('2018-02-01T13:24:00'),
    title: 'Experimental medications for COVID',
    content:
      "This night shifts are killing me! I'm not really sure about how to deal with it, but I guess sleep deprivation is a major factor when we talk about medical error",
    authorAvatarUrl: require('../../assets/sinuhe.jpg')
  }
]

const ForumCard = ({ onPress }) => {
  const navigation = useNavigation()

  return (
    <Card onPress={onPress} title={'Forum'}>
      <ListItemSeparator />
      {posts.map(post => (
        <Post
          key={post._id}
          onPress={() =>
            navigation.navigate('ForumPostScreen', { _id: post._id })
          }
          elapsedTime={convertHours(hoursFromDate(post.createdAt))}
          title={post.title}
          content={post.content}
          image={post.authorAvatarUrl}
        />
      ))}
      <Text style={styles.dots}>...</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  dots: {
    fontSize: 30,
    color: colors.medium,
    textAlign: 'center'
  }
})

export default ForumCard
