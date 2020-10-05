import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import PasswordResetScreen from '../screens/PasswordResetScreen'
import PasswordResetConfirmationScreen from '../screens/PasswordResetConfirmationScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AppNavigator from './AppNavigator'

const Stack = createStackNavigator()

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
    <Stack.Screen
      name="PasswordResetConfirmationScreen"
      component={PasswordResetConfirmationScreen}
    />
    <Stack.Screen name="AppNavigator" component={AppNavigator} />
  </Stack.Navigator>
)

export default AuthNavigator
