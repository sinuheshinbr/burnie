import jwtDecode from 'jwt-decode'
import React, { useContext } from 'react'

import ActivityIndicator from '../components/ActivityIndicator'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import EditProfile from '../components/edit-profile/EditProfile'
import useApi from '../hooks/useApi'
import usersApi from '../api/users'

const ConfigurationScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const { user, setUser } = authContext
  const { _id } = user
  const { request: updateUser, error, data, loading } = useApi(
    usersApi.updateUser
  )

  const handleSubmit = async values => {
    const token = await authStorage.getToken()
    const response = await updateUser(_id, values, token)
    if (!response?.ok) return
    const user = jwtDecode(response.data)
    authContext.setUser(user)
    authStorage.storeToken(response.data)
    navigation.navigate('HomeScreen')
  }

  const handleLogout = () => {
    setUser(null)
    authStorage.removeToken()
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <EditProfile
          error={error}
          data={data}
          handleSubmit={handleSubmit}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </>
  )
}

export default ConfigurationScreen
