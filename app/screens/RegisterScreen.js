import React from 'react'
import usersApi from '../api/users'
import useApi from '../hooks/useApi'
import Background from '../components/Background'
import ActivityIndicator from '../components/ActivityIndicator'
import RegisterScrollView from '../components/auth/RegisterScrollView'

const RegisterScreen = ({ navigation }) => {
  const { request: createUser, error, data, loading } = useApi(
    usersApi.createUser
  )

  const handleSubmit = async values => {
    const response = await createUser(values)
    if (response?.ok) {
      navigation.navigate('AppNavigator', {
        screen: 'ConfigurationScreen'
      })
    }
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
