import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import jwtDecode from 'jwt-decode'
import { AppLoading } from 'expo'

import AuthContext from './app/auth/context'
import AppNavigator from './app/navigation/AppNavigator'
import AuthNavigator from './app/navigation/AuthNavigator'
import authStorage from './app/auth/storage'

export default function App() {
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreToken = async () => {
    const token = await authStorage.getToken()
    if (!token) return
    setUser(jwtDecode(token))
  }

  if (!isReady)
    return (
      <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
    )

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
