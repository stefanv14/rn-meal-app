import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Colors from '../constants/Colors'
import FilterScreen from '../src/screens/FilterScreen'

const FavStack = createStackNavigator()

const FailterStackScreen = () => (
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
    <FavStack.Screen name="Filter" component={FilterScreen} />
  </FavStack.Navigator>
)

export default FailterStackScreen
