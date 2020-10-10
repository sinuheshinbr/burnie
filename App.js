import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './app/navigation/AuthNavigator'
import AuthContext from './app/auth/context'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState()

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
