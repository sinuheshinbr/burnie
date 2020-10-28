import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../config/colors'

const EditPostButton = ({
  navigation,
  parent,
  _id,
  title,
  content,
  isPostItem = false,
  firstPostTitle
}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('EditPostScreen', {
            _id,
            title,
            content,
            parent,
            isPostItem,
            firstPostTitle: firstPostTitle ? firstPostTitle : null
          })
        }
      >
        <MaterialCommunityIcons
          color={colors.medium}
          size={20}
          name="pencil-outline"
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '88%',
    top: '12%'
  }
})

export default EditPostButton
