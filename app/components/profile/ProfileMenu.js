import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../../config/colors'
import ListItemSeparator from '../ListItemSeparator'
import IconButton from '../IconButton'
import NotificationIcon from './NotificationIcon'

const ProfileMenu = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Burnie</Text>
        <View style={styles.icons}>
          <NotificationIcon newNotifications={100} />
          <IconButton onPress={() => console.log('cog pressed')}>
            <Entypo name="cog" size={25} color={colors.medium} />
          </IconButton>
        </View>
      </View>
      <ListItemSeparator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20
  },
  icons: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between'
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    color: colors.medium
  }
})

export default ProfileMenu
