import { StyleSheet } from 'react-native';
import { appColors } from 'src/styles/appColors';

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
    // marginRight: 4,
  },
  dateSelector: {
    // marginRight: 4,
    // marginLeft: 4,
    marginBottom: 8,
  },
  dateSelectorText: {
    // marginRight: 4,
    // marginBottom: 8,
    flex: 1,
  },

  ///extra
  containerInner: { zIndex: 1 },
  placeSearchContainer: { marginBottom: 8 },
  buttonColor: { color: appColors.black },
  buttonContainer: { marginVertical: 20 },
});

export default styles;
