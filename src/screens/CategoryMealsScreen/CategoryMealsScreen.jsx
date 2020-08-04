import { PropTypes } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import MealsList from '../../../components/MealsList'
import CategoriesContext from '../../../context/CategoriesContext'
import Meal from '../../../models/meal'
import { styles } from './CategoryMealsScreen.styles'

const CategoryMealScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true)

  const value = useContext(CategoriesContext)
  const catId = route.params.categoryId

  useEffect(() => {
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
      .finally(() => setLoading(false))
  }, [])

  const availableMeals = [...value.meals]

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0,
  )

  return isLoading ? (
    <View style={styles.spinner}>
      <ActivityIndicator color="#999999" size="large" />
    </View>
  ) : (
    <MealsList listData={displayedMeals} navigation={navigation} />
  )
}

CategoryMealScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default CategoryMealScreen
