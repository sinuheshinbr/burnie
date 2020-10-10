import React from 'react'
import Background from '../components/Background'
import ActivityIndicator from '../components/ActivityIndicator'
import PasswordResetForm from '../components/auth/PasswordResetForm'
import useApi from '../hooks/useApi'
import authApi from '../api/auth'

const PasswordResetScreen = ({ navigation }) => {
  const { request: resetPassword, error, data, loading } = useApi(
    authApi.passwordReset
  )

  const handleSubmit = async email => {
    const response = await resetPassword(email)
    if (response.ok) navigation.navigate('PasswordResetConfirmationScreen')
  }

  return (
    <Background>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <PasswordResetForm
          navigation={navigation}
          error={error}
          data={data}
          handleSubmit={handleSubmit}
        />
      )}
    </Background>
  )
}

export default PasswordResetScreen
