import React, { useEffect, useContext, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Dimensions
} from 'react-native'
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
import ActivitySpinner from '../components/ActivitySpinner'

const ForumDiscussionsScreen = ({ navigation }) => {
  const [load, setLoad] = useState(false)
  const [posts, setPosts] = useState([])
  const { request: getPosts, loading } = useApi(postsApi.getPosts)
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
      {loading && (
        <ActivitySpinner height={Dimensions.get('window').height * 0.687} />
      )}
      {!loading && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <DiscussionItem
              key={item._id}
              title={item.title}
              content={item.content}
              author={item.user.name ?? ''}
              _id={item._id}
              onPress={() => navigation.navigate('ForumPostScreen', { item })}
            />
          )}
          keyExtractor={post => post._id}
          refreshControl={<RefreshControl onRefresh={onLoad} />}
          contentContainerStyle={styles.container}
        />
      )}
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
    height: '7.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2.5%',
    marginTop: '2.5%'
  },
  button: {
    width: '90%',
    alignSelf: 'center'
  },
  container: {
    width: '90%',
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
    marginTop: '2.5%',
    height: '7.5%'
  }
})

export default ForumDiscussionsScreen
