import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Colors from '../constants/Colors'
import FavoritesScreen from '../src/screens/FavoritesScreen/FavoritesScreen'

const FavStack = createStackNavigator()

const FavoriteStackScreen = () => (
  <FavStack.Navigator
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
    <FavStack.Screen name="Favorites" component={FavoritesScreen} />
  </FavStack.Navigator>
)

export default FavoriteStackScreen
