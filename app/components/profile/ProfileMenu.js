import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'
import colors from '../../config/colors'
import ListItemSeparator from '../ListItemSeparator'
import IconButton from '../IconButton'
import NotificationIcon from './NotificationIcon'
import { useNavigation } from '@react-navigation/native'

const ProfileMenu = ({ isEditing, path = '', onSave }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <View style={styles.simpleView}>
          <Text style={styles.text}>{path}</Text>
        </View>
        <View style={styles.simpleViewCenter}>
          <Image
            source={require('../../assets/burnie-logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.viewComplex}>
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
    alignItems: 'center'
  },
  secondaryContainer : {
    width: '95%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  simpleView: {
    width: '33%'
  },
  simpleViewCenter : {
    width: '33%',
    alignItems: 'center'
  },
  viewComplex: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    fontSize: 20,
    color: colors.medium
  },
  image : {
    width: 50,
    height: 50,
  },
})

export default ProfileMenu
