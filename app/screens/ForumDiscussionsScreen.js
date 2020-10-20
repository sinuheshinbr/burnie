import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import colors from '../config/colors'
import postsApi from '../api/posts'
import DiscussionItem from '../components/forum/DiscussionItem'
import IconButton from '../components/IconButton'
import { ProfileMenu } from '../components/profile'
import Screen from '../components/Screen'
import useApi from '../hooks/useApi'

const ForumDiscussionsScreen = ({ navigation }) => {
  const [load, setLoad] = useState(false)
  const [posts, setPosts] = useState([])
  const { request: getPosts } = useApi(postsApi.getPosts)
  const { user } = useContext(AuthContext)
  const { _id } = user

  const onLoad = async () => {
    const jwt = await authStorage.getToken()
    const response = await getPosts(_id, jwt)
    if (!response?.ok) return
    setPosts(response.data)
  }

  useEffect(() => {
    onLoad()
    const unsubscribe = navigation.addListener('focus', () => {
      setLoad(!load)
    })

    return unsubscribe
  }, [load, navigation])

  return (
    <Screen style={styles.screen}>
      <ProfileMenu path="Forum" />
      <Text style={styles.text}>The Burnout Forum</Text>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        {posts.map(post => (
          <DiscussionItem
            key={post._id}
            title={post.title}
            content={post.content}
            author={post.user.name ?? ''}
            _id={post._id}
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
