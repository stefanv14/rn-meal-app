import { PropTypes } from 'prop-types'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import MealItem from './MealItem'

const MealsList = ({ listData, navigation }) => {
  const renderMealItem = (itemData) => (
    <MealItem
      title={itemData.item.title}
      image={itemData.item.imageUrl}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      onSelectMeal={() => {
        navigation.navigate('MealDetail', {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
        })
      }}
    />
  )

  return (
    <View style={styles.list}>
      <FlatList data={listData} renderItem={renderMealItem} style={{ width: '100%' }} />
    </View>
  )
}

MealsList.propTypes = {
  listData: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default MealsList

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
})
