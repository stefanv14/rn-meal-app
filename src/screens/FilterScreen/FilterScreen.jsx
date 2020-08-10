import { PropTypes } from 'prop-types'
import React, { useContext, useEffect, useReducer } from 'react'
import { ActivityIndicator, Switch, Text, View } from 'react-native'
import DefaultText from '../../../components/DefaultText'
import Colors from '../../../constants/Colors'
import CategoriesContext from '../../../context/CategoriesContext'
import Meal from '../../../models/meal'
import { styles } from './FilterScreen.styles'

const initialState = {
  isLoading: true,
  glutenFree: false,
  lactoseFree: false,
  vegan: false,
  isVegetarian: false,
  meals: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: false,
      }
    case 'GLUTEN_FREE':
      return {
        ...state,
        glutenFree: !state.glutenFree,
      }
    case 'LACTOSE_FREE':
      return {
        ...state,
        lactoseFree: !state.lactoseFree,
      }
    case 'VEGAN':
      return {
        ...state,
        vegan: !state.vegan,
      }
    case 'VEGETARIAN':
      return {
        ...state,
        isVegetarian: !state.isVegetarian,
      }
    case 'SET_MEALS':
      return {
        ...state,
        meals: action.payload,
      }
    default:
      return state
  }
}

const FilterSwitch = ({ label, state, onChange }) => (
  <View style={styles.filterContainer}>
    <DefaultText>{label}</DefaultText>
    <Switch
      trackColor={{ true: Colors.primaryColor }}
      thumbColor={Colors.primaryColor}
      value={state}
      onValueChange={onChange}
    />
  </View>
)

const FilterScreen = () => {
  const value = useContext(CategoriesContext)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.meals.length === 0) {
      // eslint-disable-next-line
      fetch('https://rn-meals-app-a099c.firebaseio.com/meals.json')
        .then((response) => response.json())
        .then((json) => {
          const loadedMeals = []

          for (const key in json) {
            loadedMeals.push(
              new Meal(
                json[key].id,
                json[key].categoryIds,
                json[key].title,
                json[key].affordability,
                json[key].complexity,
                json[key].imageUrl,
                json[key].duration,
                json[key].ingredients,
                json[key].steps,
                json[key].isGlutenFree,
                json[key].isVegan,
                json[key].isVegetarian,
                json[key].isLactoseFree,
              ),
            )
          }

          dispatch({ type: 'SET_MEALS', payload: loadedMeals })
        })
        .catch((error) => console.error(error)) //eslint-disable-line
        .finally(() => dispatch({ type: 'LOADING' }))
    }

    const valueFilt = state.meals.filter((el) => {
      if (el.isGlutenFree === state.glutenFree) {
        return true
      }
      if (el.isLactoseFree === state.isLactoseFree) {
        return true
      }
      if (el.isVegan === state.isVegan) {
        return true
      }
      if (el.isVegeterian === state.isVegetarian) {
        return true
      }
      return false
    })
    value.setMeals(valueFilt)

    return () => {
      // cleanup
    }
  }, [
    dispatch,
    state.glutenFree,
    state.lactoseFree,
    state.vegan,
    state.isVegetarian,
  ])

  const glutenFree = () => {
    dispatch({ type: 'GLUTEN_FREE' })
  }

  const lactoseFree = () => {
    dispatch({ type: 'LACTOSE_FREE' })
  }

  const veganFilter = () => {
    dispatch({ type: 'VEGAN' })
  }

  const vegetarianFilter = () => {
    dispatch({ type: 'VEGETARIAN' })
  }

  return state.isLoading ? (
    <View style={styles.loadWrapper}>
      <ActivityIndicator color="#999999" size="large" />
    </View>
  ) : (
    <View style={styles.FilterScreenWrapper}>
      <Text style={styles.title}>Available filters</Text>
      <FilterSwitch
        label="Gluten free"
        state={state.glutenFree}
        onChange={() => {
          glutenFree()
        }}
      />
      <FilterSwitch
        label="Lactose free"
        state={state.lactoseFree}
        onChange={() => lactoseFree()}
      />
      <FilterSwitch
        label="Vegan"
        state={state.vegan}
        onChange={() => veganFilter()}
      />
      <FilterSwitch
        label="Vegeterian"
        state={state.isVegetarian}
        onChange={() => vegetarianFilter()}
      />
    </View>
  )
}

FilterSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

FilterScreen.propTypes = {
  //
}

FilterScreen.defaultProps = {
  // bla: 'test',
}

export default FilterScreen
