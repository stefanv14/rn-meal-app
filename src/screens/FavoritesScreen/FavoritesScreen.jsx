import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './FavoritesScreen.styles'

const FavoritesScreen = () => (
  <View style={styles.FavoritesScreenWrapper}>
    <Text>Test content</Text>
  </View>
)

FavoritesScreen.propTypes = {
  // bla: PropTypes.string,
}

FavoritesScreen.defaultProps = {
  // bla: 'test',
}

export default FavoritesScreen
