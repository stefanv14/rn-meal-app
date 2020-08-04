import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Colors from '../constants/Colors'
import { CATEGORIES } from '../data/dummy-data'
import CategoriesScreen from '../src/screens/CategoriesScreen'
import CategoryMealsScreen from '../src/screens/CategoryMealsScreen/index'
import MealDetailScreen from '../src/screens/MealDetailScreen/MealDetailScreen'

const Stack = createStackNavigator()

const HomeStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold',
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans',
      },
      headerTintColor: 'white',
    }}
  >
    <Stack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{ headerTitleStyle: { alignSelf: 'center' } }}
    />
    <Stack.Screen
      name="CategoryMeals"
      component={CategoryMealsScreen}
      options={({ route }) => {
        const selectedCategory = CATEGORIES.find((cat) => cat.id === route.params.categoryId)
        return {
          headerTitle: selectedCategory.title,
          headerTitleStyle: { alignSelf: 'flex-start' },
        }
      }}
    />
    <Stack.Screen
      name="MealDetail"
      component={MealDetailScreen}
      options={({ route }) => {
        const { mealTitle } = route.params
        return {
          headerTitle: mealTitle,
        }
      }}
    />
  </Stack.Navigator>
)

export default HomeStackScreen
