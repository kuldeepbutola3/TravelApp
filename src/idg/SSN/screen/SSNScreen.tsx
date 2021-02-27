import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from 'src/idg/flight/FlightModel';
import { fetchFlightFare } from 'src/idg/flight/flightSlice';
import SeatsTab from './SeatsTab';
import MealsTab from './MealsTab';
import BaggageTab from './BaggageTab';
import { flightReducer } from '../flightReducer';
import { Touchable } from 'src/components/Touchable';

export interface SSNScreenProps {
  param: FlightSet;
}

function useSeatsPrice(travellers, store) {
  const [state, setState] = useState({ seats: 0, price: 0 });

  useEffect(() => {
    let seats = 0;
    let price = 0;
    for (const traveller of travellers) {
      if (store[traveller?.fName]?.code) {
        seats += 1;
        price += store[traveller.fName].price;
      }
    }
    setState({ seats, price });
  }, [store]);

  return state;
}

function useBaggagePrice(travellers, store) {
  const [state, setState] = useState({ baggages: 0, price: 0 });
  useEffect(() => {
    let baggages = 0;
    let price = 0;
    for (const traveller of travellers) {
      if (store[traveller?.fName]) {
        baggages = store[traveller.fName].length;
        price = store[traveller.fName].reduce((acc, item) => acc + item.price, 0);
      }
    }
    setState({ baggages, price });
  }, [store]);

  return state;
}

function useMealsPrice(travellers, store) {
  const [state, setState] = useState({ meals: 0, price: 0 });
  useEffect(() => {
    let meals = 0;
    let price = 0;
    for (const traveller of travellers) {
      if (store[traveller?.fName]) {
        meals = store[traveller.fName].length;
        price = store[traveller.fName].reduce((acc, item) => acc + item.price, 0);
      }
    }
    setState({ meals, price });
  }, [store]);

  return state;
}

export const SSNScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'ReviewFlight'>();
  const { flightFare, travellerAdult, travellerChild } = useSliceSelector('flight');

  console.log('flightFare.......ss', JSON.stringify(flightFare));
  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  const allTravellers = [...travellerAdult, ...travellerChild];
  const initialFlightState = {
    seats: {},
    meals: {},
    baggage: {},
    traveller: allTravellers[0].fName,
    source: 'DEL',
  };
  const [flightState, dispatchToFlightReducer] = useReducer(flightReducer, initialFlightState);
  const seatsData = useMemo(() => flightState?.seats?.[flightState?.source] || {}, [flightState]);
  const mealsData = useMemo(() => flightState?.meals?.[flightState?.source] || {}, [flightState]);
  const baggageData = useMemo(() => flightState?.baggage?.[flightState?.source] || {}, [
    flightState,
  ]);
  console.log('seatsData.....', seatsData);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'seats', title: 'Seats' },
    { key: 'meals', title: 'Meals' },
    { key: 'baggage', title: 'Baggage' },
  ]);
  const totalSeatsPrice = useSeatsPrice(allTravellers, seatsData);
  const totalMealsPrice = useMealsPrice(allTravellers, mealsData);
  const totalBaggagesPrice = useBaggagePrice(allTravellers, baggageData);
  const totalPrice = useMemo(
    () => totalSeatsPrice.price + totalBaggagesPrice.price + totalMealsPrice.price,
    [totalMealsPrice, totalSeatsPrice, totalBaggagesPrice]
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'seats':
        return (
          <SeatsTab
            seats={
              flightFare?.artSSRResponse?.ssrInnerResponse?.seatDynamic?.[0]?.segmentSeat?.[0]
                ?.rowSeats || []
            }
            dispatchToFlightReducer={dispatchToFlightReducer}
            selectedSeat={flightState?.seats?.[flightState?.source]?.[flightState?.traveller] || {}}
            totalTravellers={allTravellers}
            totalSeatsPrice={totalSeatsPrice}
            renderRoutes={renderRoutes}
            renderTravellers={renderTravellers}
          />
        );
      case 'meals':
        return (
          <MealsTab
            meals={flightFare?.artSSRResponse?.ssrInnerResponse?.mealDynamic?.[0] || []}
            dispatchToFlightReducer={dispatchToFlightReducer}
            selectedMeals={
              flightState?.meals?.[flightState?.source]?.[flightState?.traveller] || []
            }
            totalMealsPrice={totalMealsPrice}
            renderRoutes={renderRoutes}
            renderTravellers={renderTravellers}
          />
        );
      case 'baggage':
        return (
          <BaggageTab
            baggage={flightFare?.artSSRResponse?.ssrInnerResponse?.baggage?.[0] || []}
            dispatchToFlightReducer={dispatchToFlightReducer}
            selectedBaggage={
              flightState?.baggage?.[flightState?.source]?.[flightState?.traveller] || []
            }
            totalBaggagesPrice={totalBaggagesPrice}
            renderRoutes={renderRoutes}
            renderTravellers={renderTravellers}
          />
        );
      default:
        return null;
    }
  };

  const renderTravellers = ({ item }) => {
    const isSelected = flightState.traveller === item.fName;
    return (
      <Touchable
        onPress={() => dispatchToFlightReducer({ type: 'UPDATE_TRAVELLER', payload: item.fName })}
        style={{
          backgroundColor: isSelected ? 'blue' : '#EAEAEA',
          justifyContent: 'center',
          alignItems: 'center',
          width: 110,
          height: 30,
          borderRadius: 30,
          borderColor: 'white',
          borderWidth: 1,
          marginRight: 8,
          margin: 10,
          alignSelf: 'center',
        }}
      >
        <Text style={{ color: isSelected ? 'white' : 'black', fontWeight: '700' }}>
          {item.fName}
        </Text>
      </Touchable>
    );
  };

  const renderRoutes = ({ item }) => {
    const isSelected = flightState.source === item.origin;
    return (
      <Touchable
        onPress={() => dispatchToFlightReducer({ type: 'UPDATE_SOURCE', payload: item.origin })}
        style={{
          backgroundColor: isSelected ? 'blue' : '#EAEAEA',
          justifyContent: 'center',
          alignItems: 'center',
          width: 110,
          height: 30,
          borderRadius: 30,
          borderColor: 'white',
          borderWidth: 1,
          marginRight: 8,
          margin: 10,
          alignSelf: 'center',
        }}
      >
        <Text style={{ color: isSelected ? 'white' : 'black', fontWeight: '700' }}>
          {item.origin}-{item.destination}
        </Text>
      </Touchable>
    );
  };

  useEffect(() => {
    if (param.resultSessionId) {
      console.log('api.......');
      dispatch(fetchFlightFare({ resultSessionId: [param.resultSessionId] }));
    }
  }, [dispatch, param]);

  useEffect(() => {
    console.log({ flightState });
  }, [flightState]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('ssrAdon')} />

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{ backgroundColor: 'white' }}
          // renderTabBar={renderTabBar}
          // initialLayout={initialLayout}
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'black',
            padding: 10,
            height: 80,
          }}
        >
          <View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              INR {totalPrice}
            </Text>
          </View>
          <Touchable
            style={{
              width: 120,
              backgroundColor: 'purple',
              height: 40,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Next</Text>
          </Touchable>
        </View>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
