import { PropTypes } from 'prop-types'
import React, { useContext } from 'react'
import MealsList from '../../../components/MealsList'
import CategoriesContext from '../../../context/CategoriesContext'

const CategoryMealScreen = ({ navigation, route }) => {
  const value = useContext(CategoriesContext) // eslint-disable-line
  const catId = route.params.categoryId

  const availableMeals = [...value.meals]

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0,
  )

  return <MealsList listData={displayedMeals} navigation={navigation} />
}

CategoryMealScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default CategoryMealScreen
