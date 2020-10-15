import jwtDecode from 'jwt-decode'
import React, { useContext } from 'react'

import ActivityIndicator from '../components/ActivityIndicator'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import Background from '../components/Background'
import RegisterScrollView from '../components/auth/RegisterScrollView'
import useApi from '../hooks/useApi'
import usersApi from '../api/users'

const RegisterScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const { request: createUser, error, data, loading } = useApi(
    usersApi.createUser
  )

  const handleSubmit = async values => {
    const response = await createUser(values)
    if (!response?.ok) return
    const user = jwtDecode(response.data)
    authContext.setUser(user)
    authStorage.storeToken(response.data)
  }

  return (
    <Background>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <RegisterScrollView
          navigation={navigation}
          error={error}
          data={data}
          handleSubmit={handleSubmit}
        />
      )}
    </Background>
  )
}

export default RegisterScreen
