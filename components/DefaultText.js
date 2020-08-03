import React from 'react'
import { StyleSheet, Text } from 'react-native'
// eslint-disable-next-line
const DefaultText = (props) => <Text style={styles.text}>{props.children}</Text>

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
})

export default DefaultText
