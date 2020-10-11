import React, { useContext } from 'react'
import usersApi from '../api/users'
import useApi from '../hooks/useApi'
import AuthContext from '../auth/context'
import jwtDecode from 'jwt-decode'
import Background from '../components/Background'
import ActivityIndicator from '../components/ActivityIndicator'
import RegisterScrollView from '../components/auth/RegisterScrollView'

const RegisterScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const { request: createUser, error, data, loading } = useApi(
    usersApi.createUser
  )

  const handleSubmit = async values => {
    const response = await createUser(values)
    if (!response.ok) return
    const user = jwtDecode(response.data)
    authContext.setUser(user)
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
