import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  gradientBackground: {
    height: '100%',
    width: '100%',
  },
  searchConatiner: {
    paddingHorizontal: 10,
  },
  tripButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
  },
  datesContainer: {
    flexDirection: 'row',
  },
  searchButton: {
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainerStyle: {
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  headerTitleContainerStyle: {
    borderBottomWidth: 1,
    borderColor: 'white',
    width: '100%',
  },
  inputBox: {
    marginBottom: 8,
    marginRight: 4,
  },
  dateSelector: {
    marginRight: 4,
    marginBottom: 8,
  },
});

export default styles;
