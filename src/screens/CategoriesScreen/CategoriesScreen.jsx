import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import CategoryGridTile from '../../../components/CategoryGridTile'
import CategorieContext from '../../../context/CategoriesContext'

const CategoriesScreen = () => {
  const value = useContext(CategorieContext) // eslint-disable-line

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() => {}}
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
  // bla: PropTypes.string,
}

CategoriesScreen.defaultProps = {
  // bla: 'test',
}

export default CategoriesScreen
