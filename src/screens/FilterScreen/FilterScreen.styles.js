import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  FilterScreenWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  loadWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
})
