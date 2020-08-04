import { PropTypes } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import CategoryGridTile from '../../../components/CategoryGridTile'
import CategoriesContext from '../../../context/CategoriesContext'
import Category from '../../../models/category'
import { styles } from './CategoriesScreen.styles'

const CategoriesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const value = useContext(CategoriesContext)

  useEffect(() => {
    // eslint-disable-next-line
    fetch('https://rn-meals-app-a099c.firebaseio.com/categories.json')
      .then((response) => response.json())
      .then((json) => {
        const loadedCategories = []

        for (const key in json) {
          loadedCategories.push(
            new Category(json[key].id, json[key].title, json[key].color),
          )
        }

        value.setCat(loadedCategories)
      })
      .catch((error) => console.error(error)) //eslint-disable-line
      .finally(() => setLoading(false))
  }, [])

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

  return isLoading ? (
    <View style={styles.spinner}>
      <ActivityIndicator color="#999999" size="large" />
    </View>
  ) : (
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
