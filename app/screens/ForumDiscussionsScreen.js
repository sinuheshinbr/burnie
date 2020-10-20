import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
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
import ActivitySpinner from '../components/ActivitySpinner'

const ForumDiscussionsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false)
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

  const onRefresh = () => {
    console.log('refreshing...')
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
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <DiscussionItem
            key={item._id}
            title={item.title}
            content={item.content}
            author={item.user.name ?? ''}
            _id={item._id}
          />
        )}
        keyExtractor={post => post._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.container}
      />
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
