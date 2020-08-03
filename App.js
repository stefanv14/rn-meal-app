import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import Colors from './constants/Colors.js'
import CategoriesContext from './context/CategoriesContext.js'
import { CATEGORIES } from './data/dummy-data'
import CategoriesScreen from './src/screens/CategoriesScreen/index'

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
    // meals: MEALS,
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
        </Stack.Navigator>
      </NavigationContainer>
    </CategoriesContext.Provider>
  )
}

export default App
