import React, { useCallback, useState } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useStackOptions } from 'src/navigation/stackOptions';
import { useBindAction, useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { fetchFlightPlaces, flightSlice } from 'src/idg/flight/flightSlice';
import { Header } from 'src/navigation/homeScreenHeader';
import { GradientBackground } from 'src/components/GradientBackground';
import { View } from 'react-native';
import DateSelector from './components/DateSelector';
import { TripType, HeaderTabs, ClassType } from 'src/constants/enums';
import { formatDate } from 'src/utils/date-formatter';
import { DatePicker, DatePickerProps } from 'src/components/DatePicker';
import TripTypeButton from './components/TripTypeButton';
import styles from './styles';
import InputBox from './components/InputBox';
import PlaceSearchField from './components/PlaceSearchField';
import FlightClassDropdown from './components/FlightClassDropdown';

import { ApptNavigationProp } from 'src/navigation/RootNav';
import { GetFlightParam } from 'src/idg/flight/flightApi';
import { FlightPlaces } from 'src/idg/flight/FlightModel';
import { Button } from 'src/components/Button';
import { useAuraTranslation } from 'src/utils/i18n';
import { appColors } from 'src/styles/appColors';
import { ScrollView } from 'react-native-gesture-handler';
import { Touchable } from 'src/components/Touchable';
import { TravellerCount } from 'src/idg/traveller/TravelerModel';
const CLASS: Array<{ value: ClassType }> = [
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
  const { t } = useAuraTranslation();
  const navigation = useNavigation<ApptNavigationProp>();

  const addTravellerCount = useBindAction(flightSlice.actions.addTravellerCount);

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

  const [selectedSource, setSelectedSource] = useState(undefined as FlightPlaces | undefined);
  const [selectedDestination, setSelectedDestination] = useState(
    undefined as FlightPlaces | undefined
  );

  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  const [travellersCount, setTravellersCount] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  } as TravellerCount);
  const [flightClass, setFlightClass] = useState(CLASS[0].value);

  const [selectedTab, setSelectedTab] = useState(HeaderTabs.Flights);
  const [selectedTripType, setSelectedTripType] = useState(TripType.OneWay);

  const handleSourceSearchChange = useCallback(
    (term: string) => {
      term.length % 3 === 0 && dispatch(fetchFlightPlaces({ term }));
    },
    [dispatch]
  );
  const handleDestinationSearchChange = useCallback(
    (term: string) => {
      term.length % 3 === 0 && dispatch(fetchFlightPlaces({ term }));
    },
    [dispatch]
  );
  const handleFlightsTabPress = () => setSelectedTab(HeaderTabs.Flights);
  const handleHotelsTabPress = () => setSelectedTab(HeaderTabs.Hotels);
  const handleClassChange = (value: ClassType) => setFlightClass(value);
  const clearFlightPlaces = () => dispatch(fetchFlightPlaces({ term: '' }));
  const handleSourcePlaceSelect = (place: any) => {
    setSelectedSource(place);
    clearFlightPlaces();
  };
  const handleDestinationPlaceSelect = (place: any) => {
    setSelectedDestination(place);
    clearFlightPlaces();
  };

  const toDateChange = useCallback<DatePickerProps['onValueChange']>(
    (sender) => {
      setDepartureDate(sender);

      console.log('time', returnDate.getTime(), sender.getTime());
      if (returnDate.getTime() < sender.getTime()) {
        setReturnDate(sender);
      }
      return true;
    },
    [setDepartureDate, setReturnDate, returnDate]
  );
  const returnDateChange = useCallback<DatePickerProps['onValueChange']>(
    (sender) => {
      setReturnDate(sender);
      return true;
    },
    [setReturnDate]
  );

  const searchButtonTapped = useCallback(() => {
    if (selectedSource && selectedDestination && travellersCount) {
      const journeyPayLoad: GetFlightParam = {
        class: flightClass,
        originName: selectedSource.airportName,
        destinationName: selectedDestination.airportName,
        originCode: selectedSource.airportCode,
        destinationCode: selectedDestination.airportCode,
        journeyType: selectedTripType,
        adultCount: travellersCount.adult,
        childCount: travellersCount.children,
        infantCount: travellersCount.infant,
        journeyDate1: departureDate,
        journeyDate2: returnDate,
      };
      addTravellerCount(travellersCount);
      navigation.navigate('FlightSearch', { param: journeyPayLoad });
    }
  }, [
    navigation,
    selectedSource,
    selectedDestination,
    flightClass,
    travellersCount,
    selectedTripType,
    departureDate,
    returnDate,
    addTravellerCount,
  ]);

  // console.log(
  //   { selectedSource },
  //   { selectedDestination },
  //   { departureDate },
  //   { returnDate },
  //   { travellersCount },
  //   { flightClass },
  //   { selectedTripType }
  // );
  const searchDisable = !selectedSource && !selectedDestination;

  const plaxesearch1 = { bottom: -(80 - 10) };
  const placesearch2 = { bottom: -(80 + 80 + 8 - 10) };

  const _onPressTraveller = useCallback(() => {
    navigation.navigate('Traveller', {
      numberOfTraveller: travellersCount,
      callBack: setTravellersCount,
    });
  }, [navigation, travellersCount, setTravellersCount]);
  return (
    <View style={styles.container}>
      <GradientBackground
        style={styles.gradientBackground}
        colors={['#4c669f', '#3b5998', '#192f6a']}
      >
        <Screen style={[styles.searchConatiner, { paddingTop: headerHeight }]}>
          <ScrollView>
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
              {/* <TripTypeButton
              title={TripType.MultiCity}
              selected={selectedTripType === TripType.MultiCity}
              onPress={() => setSelectedTripType(TripType.MultiCity)}
            /> */}
            </View>

            <View>
              <View style={styles.containerInner}>
                <PlaceSearchField
                  type="From"
                  onChangeText={handleSourceSearchChange}
                  places={places}
                  onSelectPlace={handleSourcePlaceSelect}
                  selectedPlace={selectedSource}
                  containerStyle={styles.placeSearchContainer}
                  suggestionContainerStyle={plaxesearch1}
                  placeholder="Search Source"
                />
                <PlaceSearchField
                  type="To"
                  onChangeText={handleDestinationSearchChange}
                  places={places}
                  onSelectPlace={handleDestinationPlaceSelect}
                  selectedPlace={selectedDestination}
                  containerStyle={styles.placeSearchContainer}
                  suggestionContainerStyle={placesearch2}
                  placeholder="Search Destination"
                />
              </View>

              <View style={styles.datesContainer}>
                <DatePicker
                  containerStyle={{ flex: 1, paddingRight: 4 }}
                  textColor="black"
                  onValueChange={toDateChange}
                  value={departureDate}
                  mode="date"
                  minimumDate={new Date()}
                >
                  <DateSelector
                    disabled={false}
                    label="DEPARTURE"
                    date={formatDate(departureDate, 'DD MMM YYYY')}
                    day={formatDate(departureDate, 'dddd')}
                    // onPress={showDatePicker}
                    containerStyles={{ ...styles.dateSelector, ...{ width: '100%' } }}
                  />
                </DatePicker>

                {selectedTripType === TripType.RoundTrip ? (
                  <DatePicker
                    containerStyle={{ flex: 1 }}
                    onValueChange={returnDateChange}
                    value={returnDate || new Date()}
                    mode="date"
                    minimumDate={departureDate}
                  >
                    <DateSelector
                      label="RETURN"
                      date={formatDate(returnDate, 'DD MMM YYYY')}
                      day={formatDate(returnDate, 'dddd')}
                      // onPress={showReturnDatePicker}
                      // containerStyles={styles.dateSelector}
                      containerStyles={{ ...styles.dateSelector, ...{ width: '100%' } }}
                    />
                  </DatePicker>
                ) : (
                  <View style={{ flex: 1 }}>
                    <DateSelector
                      label="RETURN"
                      disabled={true}
                      date={formatDate(returnDate, 'DD MMM YYYY')}
                      day={formatDate(returnDate, 'dddd')}
                      // onPress={showReturnDatePicker}
                      containerStyles={styles.dateSelector}
                    />
                  </View>
                )}
              </View>
              <View style={styles.datesContainer}>
                <Touchable style={{ flex: 1 }} onPress={_onPressTraveller}>
                  <InputBox
                    label="TRAVELLERS"
                    value={(
                      travellersCount.adult +
                      travellersCount.children +
                      travellersCount.infant
                    ).toString()}
                    onChangeText={() => {}}
                    containerStyle={{ ...styles.inputBox, ...{ marginRight: 4 } }}
                    disabled={true}
                  />
                </Touchable>
                {/* </Touchable> */}
                <View style={{ flex: 1 }}>
                  <FlightClassDropdown
                    data={CLASS}
                    value={flightClass}
                    onChangeText={handleClassChange}
                    containerStyle={styles.inputBox}
                    label="CLASS"
                  />
                </View>
              </View>

              {/* <SearchButton
              onPress={searchButtonTapped}
              title="Search Flight"
              containerStyle={{ marginVertical: 20 }}
            /> */}
              <Button
                bgColor={appColors.white}
                title={t('searchFlight')}
                onPress={searchButtonTapped}
                titleStyle={styles.buttonColor}
                containerStyle={styles.buttonContainer}
                disabled={searchDisable}
              />

              {/* <DatePicker
                showPicker={datePickerVisible}
                value={departureDate}
                onValueChange={handleDateChange}
                // onRequestClose={hideDatePicker}
                minimumDate={new Date()}
              /> */}

              {/* <DatePicker
                showPicker={toDatePickerVisible}
                value={returnDate}
                onValueChange={handleReturnDateChange}
                onRequestClose={hideReturnDatePicker}
                minimumDate={new Date()}
              /> */}
            </View>
          </ScrollView>
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
