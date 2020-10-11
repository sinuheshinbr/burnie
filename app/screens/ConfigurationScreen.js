import React from 'react'
import usersApi from '../api/users'
import useApi from '../hooks/useApi'
import EditProfile from '../components/edit-profile/EditProfile'
import ActivityIndicator from '../components/ActivityIndicator'

const ConfigurationScreen = ({ navigation }) => {
  const { request: updateUser, error, data, loading } = useApi(
    usersApi.updateUser
  )

  const handleSubmit = async values => {
    const response = await updateUser(id, values)
    if (response.ok) navigation.navigate('HomeScreen')
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <EditProfile
          navigation={navigation}
          error={error}
          data={data}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default ConfigurationScreen
