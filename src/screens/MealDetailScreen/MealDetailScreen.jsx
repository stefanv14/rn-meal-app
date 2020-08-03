import { PropTypes } from 'prop-types'
import React, { useContext } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import DefaultText from '../../../components/DefaultText'
import CategoriesContext from '../../../context/CategoriesContext'
import { styles } from './MealDetailScreen.styles'

const ListItem = ({ children }) => (
  <View style={styles.listItem}>
    <DefaultText>{children}</DefaultText>
  </View>
)

const MealDetailScreen = ({ route }) => {
  const value = useContext(CategoriesContext)

  const { mealId } = route.params

  const selectedMeal = value.meals.find((meal) => meal.id === mealId)

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ing) => (
        <ListItem key={ing}>{ing}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  )
}

MealDetailScreen.propTypes = {
  route: PropTypes.object.isRequired,
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

MealDetailScreen.defaultProps = {
  // bla: 'test',
}

export default MealDetailScreen
