import { PropTypes } from 'prop-types'
import React, { useCallback, useContext, useEffect } from 'react'
import { AsyncStorage, Image, ScrollView, Text, View } from 'react-native'
import DefaultText from '../../../components/DefaultText'
import AppContext from '../../../context/AppContext'
import { styles } from './MealDetailScreen.styles'

const ListItem = ({ children }) => (
  <View style={styles.listItem}>
    <DefaultText>{children}</DefaultText>
  </View>
)

const MealDetailScreen = ({ navigation, route }) => {
  const value = useContext(AppContext)

  const { mealId } = route.params

  const selectedMeal = value.meals.find((meal) => meal.id === mealId)

  if (selectedMeal === undefined) {
    return (
      <View style={styles.noMealWrapper}>
        <DefaultText>No meal go back</DefaultText>
      </View>
    )
  }

  const isInStorage = (storage) => {
    const itemInStorage = JSON.parse(storage).find(
      (el) => el.id === selectedMeal.id,
    )
    if (itemInStorage !== undefined) {
      return true
    }
    return false
  }

  const removeItemFromStorage = (storage) => {
    const filtered = JSON.parse(storage).filter(
      (el) => el.id !== selectedMeal.id,
    )
    return filtered
  }

  const toggleFavoriteHandler = useCallback(() => {
    const storeData = async () => {
      try {
        const itemsInStorage = await AsyncStorage.getItem('isFav')
        if (itemsInStorage !== null) {
          if (isInStorage(itemsInStorage)) {
            const newStorage = removeItemFromStorage(itemsInStorage)
            AsyncStorage.setItem('isFav', JSON.stringify(newStorage))
          } else {
            const parsed = JSON.parse(itemsInStorage).concat(selectedMeal)
            AsyncStorage.setItem('isFav', JSON.stringify(parsed))
          }
        } else {
          AsyncStorage.setItem('isFav', JSON.stringify([selectedMeal]))
        }
        navigation.goBack()
      } catch (error) {
        // Error saving data
      }
    }
    storeData()
  }, [mealId])

  useEffect(() => {
    navigation.setParams({ mealTitle: selectedMeal.title })
    navigation.setParams({ toggleFav: toggleFavoriteHandler })
  }, [toggleFavoriteHandler])

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
  navigation: PropTypes.object.isRequired,
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
