import jwtDecode from 'jwt-decode'
import React, { useContext, useState, useEffect } from 'react'

import ActivityIndicator from '../components/ActivityIndicator'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import EditProfile from '../components/edit-profile/EditProfile'
import useApi from '../hooks/useApi'
import usersApi from '../api/users'

const ConfigurationScreen = ({ navigation }) => {
  let isMounted = true
  const authContext = useContext(AuthContext)
  const { user, setUser } = authContext
  const { _id, avatarUrl } = user
  const defaultImage = require('../assets/image-placeholder.png')
  const [image, setImage] = useState({
    uri: avatarUrl ? avatarUrl : defaultImage
  })
  const { request: updateUser, error, data, loading } = useApi(
    usersApi.updateUser
  )

  useEffect(() => {
    return () => (isMounted = false)
  }, [])

  const handleSubmit = async values => {
    values.avatarUrl = image.uri
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
          image={image}
          setImage={setImage}
          isMounted={isMounted}
        />
      )}
    </>
  )
}

export default ConfigurationScreen
