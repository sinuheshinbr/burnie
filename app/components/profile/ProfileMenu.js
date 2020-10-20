import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'
import colors from '../../config/colors'
import ListItemSeparator from '../ListItemSeparator'
import IconButton from '../IconButton'
import NotificationIcon from './NotificationIcon'
import { useNavigation } from '@react-navigation/native'
import Back from '../Back'

const ProfileMenu = ({ isEditing, path = '', onSave, displayBack = true }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <View style={styles.leftView}>
          {displayBack && (
            <Back onPress={() => navigation.goBack()} color={colors.medium} />
          )}
        </View>
        <View style={styles.centerView}>
          <Image
            source={require('../../assets/burnie-logo.png')}
            style={styles.image}
          />
          <Text style={styles.text}>{path}</Text>
        </View>
        <View style={styles.rightView}>
          <NotificationIcon newNotifications={100} />
          {!isEditing && (
            <IconButton
              onPress={() => navigation.navigate('ConfigurationScreen')}
            >
              <Entypo name="cog" size={25} color={colors.medium} />
            </IconButton>
          )}
          {isEditing && (
            <IconButton onPress={onSave}>
              <AntDesign name="checkcircleo" size={25} color={colors.medium} />
            </IconButton>
          )}
        </View>
      </View>
      <ListItemSeparator />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    height: '10%'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  secondaryContainer: {
    width: '95%',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftView: {
    width: '33%'
  },
  centerView: {
    width: '33%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 20,
    color: colors.medium
  },
  rightView: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default ProfileMenu
