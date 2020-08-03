import { PropTypes } from 'prop-types'
import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import CategoryGridTile from '../../../components/CategoryGridTile'
import CategorieContext from '../../../context/CategoriesContext'

const CategoriesScreen = ({ navigation }) => {
  const value = useContext(CategorieContext) // eslint-disable-line

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() => {
        navigation.navigate('CategoryMeals', {
          categoryId: itemData.item.id,
        })
      }}
    />
  )

  return (
    <FlatList
      data={value.categories}
      renderItem={renderGridItem}
      numColumns={2}
    />
  )
}

CategoriesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

CategoriesScreen.defaultProps = {
  // bla: 'test',
}

export default CategoriesScreen
