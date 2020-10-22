import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import ConfigurationScreen from '../screens/ConfigurationScreen'
import EditPostScreen from '../screens/EditPostScreen'
import ForumDiscussionsScreen from '../screens/ForumDiscussionsScreen'
import ForumPostScreen from '../screens/ForumPostScreen'
import NewDiscussionFormScreen from '../screens/NewDiscussionFormScreen'

const Stack = createStackNavigator()

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ConfigurationScreen" component={ConfigurationScreen} />
    <Stack.Screen
      name="ForumDiscussionsScreen"
      component={ForumDiscussionsScreen}
    />
    <Stack.Screen name="ForumPostScreen" component={ForumPostScreen} />
    <Stack.Screen
      name="NewDiscussionFormScreen"
      component={NewDiscussionFormScreen}
    />
    <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
  </Stack.Navigator>
)

export default AppNavigator
