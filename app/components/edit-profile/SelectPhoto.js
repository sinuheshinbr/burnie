import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons'
import React, { useState, useContext } from 'react'
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'

import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'
import colors from '../../config/colors'
import useApi from '../../hooks/useApi'
import usersApi from '../../api/users'
import ProgressBar from './ProgressBar'

const SelectPhoto = ({ image, isMounted, setImage, progress, setProgress }) => {
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { _id } = user
  const [visible, setVisible] = useState(false)
  const { request: uploadImage } = useApi(usersApi.uploadImage)

  const pickImage = async () => {
    const token = await authStorage.getToken()
    const options = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    }

    let result = await ImagePicker.launchImageLibraryAsync(options)
    const base64 = result.base64

    const jsonBase64 = {
      base64: base64
    }

    if (!result.cancelled) {
      if (isMounted) {
        setProgress(0)
        setVisible(true)
        setImage({ uri: result.uri })
      }
      const response = await uploadImage(_id, jsonBase64, token, progress => {
        if (isMounted) setProgress(progress * 0.9)
      })
      if (!response?.ok || !isMounted) return
      setImage({ uri: response.data })
      setProgress(progress => progress + 0.1)
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={pickImage}>
        <View style={styles.container}>
          <Image elevation={5} source={image} style={styles.image} />
          <View style={styles.addBox}>
            <Entypo size={40} color={colors.medium} name="plus" />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ProgressBar visible={visible} progress={progress} />
    </>
  )
}

const styles = StyleSheet.create({
  addBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    elevation: 5,
    position: 'absolute',
    top: '55%',
    left: '60%'
  },
  container: {
    width: '90%',
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  }
})

export default SelectPhoto
