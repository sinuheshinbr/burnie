import React, { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'
import ParentPostForm from '../forum/ParentPostForm'
import ChildPostForm from '../forum/ChildPostForm'

const EditPostForm = ({
  handleSubmit,
  title,
  content,
  firstPostTitle,
  isSubmitting,
  isMounted
}) => {
  const contentEl = useRef(null)
  let isChild = false
  if (title.length === 0) isChild = true

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Post: </Text>
      {!isChild && (
        <ParentPostForm
          isMounted={isMounted}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          title={title}
          content={content}
          contentEl={contentEl}
        />
      )}
      {isChild && (
        <ChildPostForm
          isMounted={isMounted}
          isSubmitting={isSubmitting}
          firstPostTitle={firstPostTitle}
          handleSubmit={handleSubmit}
          content={content}
          contentEl={contentEl}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flex: 1
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.medium,
    marginTop: '5%',
    marginBottom: '5%'
  }
})

export default EditPostForm
