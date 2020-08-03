import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import CategorieContext from '../../../context/CategoriesContext'
import { styles } from './CategoriesScreen.styles'

const CategoriesScreen = () => {
  const value = useContext(CategorieContext) // eslint-disable-line

  return (
    <View style={styles.CategoriesScreenWrapper}>
      <Text>Test content</Text>
    </View>
  )
}

CategoriesScreen.propTypes = {
  // bla: PropTypes.string,
}

CategoriesScreen.defaultProps = {
  // bla: 'test',
}

export default CategoriesScreen
