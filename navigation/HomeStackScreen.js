import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { AsyncStorage } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'
import CategoriesContext from '../context/CategoriesContext'
import CategoriesScreen from '../src/screens/CategoriesScreen'
import CategoryMealsScreen from '../src/screens/CategoryMealsScreen/index'
import MealDetailScreen from '../src/screens/MealDetailScreen/MealDetailScreen'

const Stack = createStackNavigator()

const HomeStackScreen = () => {
  const value = useContext(CategoriesContext)
  return (
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
          const selectedCategory = value.categories.find(
            (cat) => cat.id === route.params.categoryId,
          )
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
          const toggleFavorite = route.params.toggleFav

          let mealFav

          const fetchDataFromStorage = async () => {
            const valueFromStorage = await AsyncStorage.getItem('isFav')
            const parsedValue = JSON.parse(valueFromStorage)
            const isFavorite = parsedValue.find((el) => el.title === mealTitle)

            if (isFavorite) {
              mealFav = true
            }
          }

          fetchDataFromStorage()

          return {
            headerTitle: mealTitle,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Favorite"
                  iconName={mealFav ? 'ios-star' : 'ios-star-outline'}
                  onPress={toggleFavorite}
                />
              </HeaderButtons>
            ),
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStackScreen
