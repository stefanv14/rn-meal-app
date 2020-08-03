import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// eslint-disable-next-line
const CategoryGridTile = ({ title, color, onSelect }) => (
  <View style={styles.gridItem}>
    <TouchableOpacity style={{ flex: 1 }} onPress={onSelect}>
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default CategoryGridTile

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    textAlign: 'right',
  },
})
