import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import ConfigurationScreen from '../screens/ConfigurationScreen'
import ForumDiscussionsScreen from '../screens/ForumDiscussionsScreen'
import ForumPostScreen from '../screens/ForumPostScreen'

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
  </Stack.Navigator>
)

export default AppNavigator
