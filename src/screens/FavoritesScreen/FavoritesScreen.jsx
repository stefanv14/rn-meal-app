import { PropTypes } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { AsyncStorage, FlatList, Text, View } from 'react-native'
import MealItem from '../../../components/MealItem'
import CategoriesContext from '../../../context/CategoriesContext'
import Meal from '../../../models/meal'
import { styles } from './FavoritesScreen.styles'

const FavoritesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [filteredMeals, setFilteredMeals] = useState()

  const value = useContext(CategoriesContext)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // eslint-disable-next-line
      fetch('https://rn-meals-app-a099c.firebaseio.com/meals.json')
        .then((response) => response.json())
        .then((json) => {
          const loadedMeals = []

          for (const key in json) {
            loadedMeals.push(
              new Meal(
                json[key].id,
                json[key].categoryIds,
                json[key].title,
                json[key].affordability,
                json[key].complexity,
                json[key].imageUrl,
                json[key].duration,
                json[key].ingredients,
                json[key].steps,
                json[key].isGlutenFree,
                json[key].isVegan,
                json[key].isVegetarian,
                json[key].isLactoseFree,
              ),
            )
          }

          value.setMeals(loadedMeals)
        })
        .catch((error) => console.error(error)) //eslint-disable-line

      const getFromAsyncStorage = async () => {
        const valueFromStorage = await AsyncStorage.getItem('isFav')
        const parsedValue = JSON.parse(valueFromStorage)

        setFilteredMeals(parsedValue)
        setLoading(false)
      }
      getFromAsyncStorage()
    })

    return unsubscribe
  }, [navigation])

  const renderMealItem = (itemData) => (
    <MealItem
      title={itemData.item.title}
      image={itemData.item.imageUrl}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      onSelectMeal={() => {
        navigation.navigate('MealDetail', {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
        })
      }}
    />
  )

  return isLoading ? (
    <Text>loading...</Text>
  ) : (
    <View style={styles.FavoritesScreenWrapper}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => item.id} // eslint-disable-line
          data={filteredMeals}
          renderItem={renderMealItem}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  )
}

FavoritesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

FavoritesScreen.defaultProps = {
  // bla: 'test',
}

export default FavoritesScreen
