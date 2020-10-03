import React, { useCallback, useState } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
// import {useSliceSelector} from 'src/redux/hooks';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useStackOptions } from 'src/navigation/stackOptions';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { fetchFlightPlaces } from 'src/idg/flight/flightSlice';
import { Header } from 'src/navigation/homeScreenHeader';
import { GradientBackground } from 'src/components/GradientBackground';
import { View } from 'react-native';
import DateSelector from './components/DateSelector';
import { TripType, HeaderTabs } from 'src/constants/enums';
import { formatDate } from 'src/utils/date-formatter';
import { DatePicker } from 'src/components/DatePicker';
import TripTypeButton from './components/TripTypeButton';
import styles from './styles';
import SearchButton from './components/SearchButton';
import InputBox from './components/InputBox';
import PlaceSearchField from './components/PlaceSearchField';
import FlightClassDropdown from './components/FlightClassDropdown';
import { debounce } from '../../../../utils/debounce';
import { ApptNavigationProp } from 'src/navigation/RootNav';
// import {configureClient} from 'src/idg/IDGClient';

const CLASS = [
  {
    value: 'Economy',
  },
  {
    value: 'Premium',
  },
  {
    value: 'Business',
  },
];

const HomeScreen: AuraStackScreen = () => {
  const navigation = useNavigation<ApptNavigationProp>();
  navigation.setOptions({
    headerTitle: () => (
      <Header
        selectedTab={selectedTab}
        onPressFlightsTab={handleFlightsTabPress}
        onPressHotelsTab={handleHotelsTabPress}
      />
    ),
    headerTitleContainerStyle: styles.headerTitleContainerStyle,
    headerLeftContainerStyle: styles.headerContainerStyle,
    headerRightContainerStyle: styles.headerContainerStyle,
    headerTransparent: true,
    headerTitleAlign: 'center',
  });
  const headerHeight = useHeaderHeight();
  const dispatch = useThunkDispatch();
  const { places } = useSliceSelector('flight');

  const [selectedSource, setSelectedSource] = useState(undefined);
  const [selectedDestination, setSelectedDestination] = useState(undefined);

  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  const [travellersCount, setTravellersCount] = useState(1);
  const [flightClass, setFlightClass] = useState(CLASS[0].value);

  const [selectedTab, setSelectedTab] = useState(HeaderTabs.Flights);
  const [selectedTripType, setSelectedTripType] = useState(TripType.OneWay);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [toDatePickerVisible, setToDatePickerVisible] = useState(false);

  const handleSourceSearchChange = debounce((term: string) => {
    dispatch(fetchFlightPlaces({ term }));
  }, 500);
  const handleDestinationSearchChange = debounce((term: string) => {
    dispatch(fetchFlightPlaces({ term }));
  }, 500);
  const handleFlightsTabPress = () => setSelectedTab(HeaderTabs.Flights);
  const handleHotelsTabPress = () => setSelectedTab(HeaderTabs.Hotels);
  const handleClassChange = (value: string) => setFlightClass(value);
  const handleTravellerCountChange = (count: any) => setTravellersCount(count);
  const handleDateChange = (_: any, date: any) => setDepartureDate(date);
  const handleReturnDateChange = (_: any, date: any) => setReturnDate(date);
  const hideDatePicker = () => setDatePickerVisible(false);
  const hideReturnDatePicker = () => setToDatePickerVisible(false);
  const showDatePicker = () => setDatePickerVisible(true);
  const showReturnDatePicker = () => setToDatePickerVisible(true);
  const clearFlightPlaces = () => dispatch(fetchFlightPlaces({ term: '' }));
  const handleSourcePlaceSelect = (place: any) => {
    setSelectedSource(place);
    clearFlightPlaces();
  };
  const handleDestinationPlaceSelect = (place: any) => {
    setSelectedDestination(place);
    clearFlightPlaces();
  };

  const searchButtonTapped = useCallback(() => navigation.navigate('FlightSearch'), [navigation]);

  console.log(
    { selectedSource },
    { selectedDestination },
    { departureDate },
    { returnDate },
    { travellersCount },
    { flightClass },
    { selectedTripType }
  );

  return (
    <View style={styles.container}>
      <GradientBackground
        style={styles.gradientBackground}
        colors={['#4c669f', '#3b5998', '#192f6a']}
      >
        <Screen style={[styles.searchConatiner, { paddingTop: headerHeight }]}>
          <View style={styles.tripButtonsContainer}>
            <TripTypeButton
              title={TripType.OneWay}
              selected={selectedTripType === TripType.OneWay}
              onPress={() => setSelectedTripType(TripType.OneWay)}
            />
            <TripTypeButton
              title={TripType.RoundTrip}
              selected={selectedTripType === TripType.RoundTrip}
              onPress={() => setSelectedTripType(TripType.RoundTrip)}
            />
            <TripTypeButton
              title={TripType.MultiCity}
              selected={selectedTripType === TripType.MultiCity}
              onPress={() => setSelectedTripType(TripType.MultiCity)}
            />
          </View>

          <View>
            <View style={{ zIndex: 1 }}>
              <PlaceSearchField
                type="From"
                onChangeText={handleSourceSearchChange}
                places={places}
                onSelectPlace={handleSourcePlaceSelect}
                selectedPlace={selectedSource}
                containerStyle={{ marginBottom: 8 }}
                suggestionContainerStyle={{ bottom: -(80 - 10) }}
                placeholder="Search Source"
              />
              <PlaceSearchField
                type="To"
                onChangeText={handleDestinationSearchChange}
                places={places}
                onSelectPlace={handleDestinationPlaceSelect}
                selectedPlace={selectedDestination}
                containerStyle={{ marginBottom: 8 }}
                suggestionContainerStyle={{ bottom: -(80 + 80 + 8 - 10) }}
                placeholder="Search Destination"
              />
            </View>

            <View style={styles.datesContainer}>
              <DateSelector
                disabled={false}
                label="DEPARTURE"
                date={formatDate(departureDate, 'DD MMM YYYY')}
                day={formatDate(departureDate, 'dddd')}
                onPress={showDatePicker}
                containerStyles={styles.dateSelector}
              />
              <DateSelector
                label="RETURN"
                disabled={selectedTripType === TripType.OneWay}
                date={formatDate(returnDate, 'DD MMM YYYY')}
                day={formatDate(returnDate, 'dddd')}
                onPress={showReturnDatePicker}
                containerStyles={styles.dateSelector}
              />
            </View>
            <View style={styles.datesContainer}>
              <InputBox
                label="TRAVELLERS"
                value={travellersCount.toString()}
                onChangeText={handleTravellerCountChange}
                containerStyle={styles.inputBox}
              />
              <FlightClassDropdown
                data={CLASS}
                value={flightClass}
                onChangeText={handleClassChange}
                containerStyle={styles.inputBox}
                label="CLASS"
              />
            </View>

            <SearchButton
              onPress={searchButtonTapped}
              title="Search Flight"
              containerStyle={{ marginVertical: 20 }}
            />
            <DatePicker
              showPicker={datePickerVisible}
              value={departureDate}
              onValueChange={handleDateChange}
              onRequestClose={hideDatePicker}
            />

            <DatePicker
              showPicker={toDatePickerVisible}
              value={returnDate}
              onValueChange={handleReturnDateChange}
              onRequestClose={hideReturnDatePicker}
            />
          </View>
        </Screen>
      </GradientBackground>
    </View>
  );
};

export type HomeRoutes = {
  Home: undefined;
};

export type HomeNavigationProp = NavigationProp<HomeRoutes>;

const Stack = createStackNavigator<HomeRoutes>();
export const HomeStack = () => {
  const { screenOptions, homeScreenOptions } = useStackOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions()}>
      <Stack.Screen name="Home" component={HomeScreen} options={homeScreenOptions('homeTitle')} />
      {/* <Stack.Screen
        name="FlightList"
        component={FlightListScreen}
        options={titleOption('searchListTitle')}
      /> */}
    </Stack.Navigator>
  );
};
