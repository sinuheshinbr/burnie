import React from 'react'
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../../config/colors'

const SelectPhoto = ({
  image = require('../../assets/image-placeholder.png')
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => console.log('Edit Profile Picture')}
    >
      <View style={styles.container}>
        <Image elevation={5} source={image} style={styles.image} />
        <View style={styles.addBox}>
          <Entypo size={40} color={colors.medium} name="plus" />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
