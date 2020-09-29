import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import IconButton from '../IconButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../config/colors'

const NotificationIcon = ({ newNotifications }) => {
  let showNotifications = false
  if (newNotifications > 0) showNotifications = true
  if (newNotifications > 99) newNotifications = '99+'
  return (
    <>
      <IconButton onPress={() => console.log('notificaton pressed')}>
        <MaterialCommunityIcons name="bell" size={25} color={colors.medium} />
      </IconButton>
      {showNotifications && (
        <View style={styles.counter}>
          <Text style={styles.text}>{newNotifications}</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  counter: {
    backgroundColor: colors.primary,
    minWidth: 15,
    borderRadius: 9,
    position: 'absolute',
    top: '10%',
    left: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 10,
    color: colors.white,
    margin: 1,
    marginLeft: 3,
    marginRight: 3
  }
})

export default NotificationIcon
