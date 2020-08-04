import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import Colors from './constants/Colors'
import CategoriesContext from './context/CategoriesContext'
import FavoriteStackScreen from './navigation/FavoriteStackScreen'
import HomeStackScreen from './navigation/HomeStackScreen'

const fetchFonts = () =>
  // eslint-disable-next-line
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

const Tab = createBottomTabNavigator()

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [catMeals, setCatMeals] = useState([])
  const [allMeals, setAllMeals] = useState([])

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  const data = {
    categories: catMeals,
    setCat: (categories) => setCatMeals(categories),
    meals: allMeals,
    setMeals: (meals) => setAllMeals(meals),
  }

  return (
    <CategoriesContext.Provider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // eslint-disable-next-line
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'Meals') {
                iconName = focused ? 'ios-restaurant' : 'ios-restaurant'
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'ios-star' : 'ios-star'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: Colors.accentColor,
            inactiveTintColor: Colors.primaryColor,
          }}
        >
          <Tab.Screen name="Meals" component={HomeStackScreen} />
          <Tab.Screen name="Favorites" component={FavoriteStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CategoriesContext.Provider>
  )
}

export default App
