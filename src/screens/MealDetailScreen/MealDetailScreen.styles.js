import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  MealDetailScreenWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  noMealWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
