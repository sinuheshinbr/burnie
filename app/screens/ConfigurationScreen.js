import jwtDecode from 'jwt-decode'
import React, { useContext, useState, useEffect, useRef } from 'react'

import ActivityIndicator from '../components/ActivityIndicator'
import AuthContext from '../auth/context'
import authStorage from '../auth/storage'
import EditProfile from '../components/edit-profile/EditProfile'
import useApi from '../hooks/useApi'
import usersApi from '../api/users'

const ConfigurationScreen = ({ navigation }) => {
  let isMounted = useRef(true)
  const authContext = useContext(AuthContext)
  const { user, setUser } = authContext
  const { _id, avatarUrl } = user
  const defaultImage = require('../assets/image-placeholder.png')
  const [progress, setProgress] = useState()
  const [image, setImage] = useState(
    avatarUrl ? { uri: avatarUrl } : defaultImage
  )
  const { request: updateUser, error, data, loading } = useApi(
    usersApi.updateUser
  )

  useEffect(() => {
    return () => (isMounted.current = false)
  }, [])

  const handleSubmit = async values => {
    if (progress && progress < 1) return

    values.avatarUrl = image.uri
    const jwt = await authStorage.getToken()
    const response = await updateUser(_id, values, jwt)
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
          progress={progress}
          setProgress={setProgress}
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
