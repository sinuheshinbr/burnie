import React, { useContext, useEffect } from 'react'
import Background from '../components/Background'
import ActivityIndicator from '../components/ActivityIndicator'
import useApi from '../hooks/useApi'
import authApi from '../api/auth'
import AuthContext from '../auth/context'
import LoginScrollView from '../components/auth/LoginScrollView'
import jwtDecode from 'jwt-decode'

const LoginScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const { request: login, error, data, loading } = useApi(authApi.login)

  const handleSubmit = async values => {
    const response = await login(values)
    if (!response.ok) return
    const user = jwtDecode(response.data)
    authContext.setUser(user)
    // navigation.navigate('AppNavigator')
  }

  return (
    <Background>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <LoginScrollView
          navigation={navigation}
          error={error}
          data={data}
          handleSubmit={handleSubmit}
        />
      )}
    </Background>
  )
}

export default LoginScreen
