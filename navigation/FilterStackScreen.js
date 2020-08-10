import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Colors from '../constants/Colors'
import FilterScreen from '../src/screens/FilterScreen'

const FilterStack = createStackNavigator()

const FilterStackScreen = () => (
  <FilterStack.Navigator
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
    <FilterStack.Screen name="Filter" component={FilterScreen} />
  </FilterStack.Navigator>
)

export default FilterStackScreen
