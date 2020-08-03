import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import Colors from './constants/Colors'
import CategoriesContext from './context/CategoriesContext'
import { CATEGORIES, MEALS } from './data/dummy-data'
import CategoriesScreen from './src/screens/CategoriesScreen/index'
import CategoryMealsScreen from './src/screens/CategoryMealsScreen/CategoryMealsScreen'
import MealDetailScreen from './src/screens/MealDetailScreen/MealDetailScreen'

const fetchFonts = () =>
  // eslint-disable-next-line
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

const Stack = createStackNavigator()

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [catMeals, setCatMeals] = useState(CATEGORIES)

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  const data = {
    categories: catMeals,
    setCat: (meals) => setCatMeals(meals),
    meals: MEALS,
  }

  return (
    <CategoriesContext.Provider value={data}>
      <NavigationContainer>
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
      </NavigationContainer>
    </CategoriesContext.Provider>
  )
}

export default App
