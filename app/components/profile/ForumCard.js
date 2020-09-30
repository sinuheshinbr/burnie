import React from 'react'
import Card from './Card'
import Post from './Post'
import { Text, StyleSheet } from 'react-native'
import ListItemSeparator from '../ListItemSeparator'
import colors from '../../config/colors'

const ForumCard = ({ onPress }) => {
  return (
    <Card onPress={onPress} title={'Forum:'}>
      <ListItemSeparator />

      <Post
        onPress={() => console.log('Post pressed')}
        elapsedTime="1h"
        title="Experimental medications for COVID"
        content="I think you need to be passionate about this job if you wanna make it work. Can't think about everything you are giving up or it will not make sense. If you truly love it then I think there is not better reward in life"
        image={require('../../assets/rudy.jpg')}
      />
      <Post
        elapsedTime="4h"
        title="Experimental medications for COVID"
        content="I doubt that closing my eyes and thinking about buddah will make any difference... You say that because you are a neurosurgeon, you don't work at the ER... not so easy to sleep after 10 hours operating a patient and losing him in the morning"
        image={require('../../assets/sinuhe.jpg')}
      />
      <Post
        elapsedTime="18h"
        title="Experimental medications for COVID"
        content="Hey, I think you guys are too young and don't know how to deal with it yet. Just try mindfulness meditation and ioga practices, it really helps"
        image={require('../../assets/mosh.jpg')}
      />
      <Post
        elapsedTime="1d"
        title="Second wave experiences"
        content="Yeah, thats sooo true... I wish I had more time to go rock climbing. I think somethimes this job takes me away from my sanity"
        image={require('../../assets/rudy.jpg')}
      />
      <Post
        elapsedTime="2d"
        title="Second wave experiences"
        content="This night shifts are killing me! I'm not really sure about how to deal with it, but I guess sleep deprivation is a major factor when we talk about medical error"
        image={require('../../assets/sinuhe.jpg')}
      />
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
