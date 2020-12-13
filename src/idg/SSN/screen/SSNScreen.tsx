import React, { useCallback, useEffect, useMemo, useReducer, useState, useRef } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { FlatList, StyleSheet, Text, View } from 'react-native';
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
import { appColors } from 'src/styles/appColors';
import RectButton from '../components/Buttons';
import {
  getCurrency,
  useBaggagePrice,
  useMealsPrice,
  useSeatsPrice,
  useSelectedSeatCodes,
} from '../utilityHooks';
import BottomSheet from 'src/components/BottomSheet/BottomSheet';
import ReviewBooking from '../components/ReviewBooking';
import TotalPriceFooter from '../components/TotalPriceFooter';

export interface SSNScreenProps {
  param: FlightSet;
}

export const SSNScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'ReviewFlight'>();
  const { flightFare, travellerAdult, travellerChild } = useSliceSelector('flight');
  const refRBSheet = useRef();
  // console.log('flightFare.......ss', JSON.stringify(flightFare?.artSSRResponse?.ssrInnerResponse?.seatDynamic?.[0]?.segmentSeat?.[0]?.rowSeats));
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
  const seatsData = useMemo(() => flightState?.seats || {}, [flightState]);
  const mealsData = useMemo(() => flightState?.meals || {}, [flightState]);
  const baggageData = useMemo(() => flightState?.baggage || {}, [flightState]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'seats', title: 'Seats' },
    { key: 'meals', title: 'Meals' },
    { key: 'baggage', title: 'Baggage' },
  ]);

  const currency = getCurrency(
    flightFare?.artSSRResponse?.ssrInnerResponse?.seatDynamic[0]?.segmentSeat[0].rowSeats[0]
      .seats[0]
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const totalSeatsPrice = useSeatsPrice(allTravellers, seatsData);
  const selectedSeats = useSelectedSeatCodes(allTravellers, flightState?.seats);
  const totalMealsPrice = useMealsPrice(allTravellers, mealsData);
  const totalBaggagesPrice = useBaggagePrice(allTravellers, baggageData);
  const totalPrice = useMemo(
    () => totalSeatsPrice.price + totalBaggagesPrice.price + totalMealsPrice.price,
    [totalBaggagesPrice, totalMealsPrice, totalSeatsPrice]
  );
  const getRoutes = () => {
    const routes = flightFare?.artSSRResponse?.ssrInnerResponse?.seatDynamic.map(
      (dynamic) => dynamic.segmentSeat[0].rowSeats[0].seats[0]
    );
    return routes;
  };

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
            allRoutes={getRoutes()}
            selectedSeats={selectedSeats}
            currency={currency}
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
            currency={currency}
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
            currency={currency}
          />
        );
      default:
        return null;
    }
  };

  const renderTravellers = ({ item }) => {
    const isSelected = flightState.traveller === item.fName;
    return (
      <RectButton
        isSelected={isSelected}
        label={`${item.fName}`}
        onPress={() => dispatchToFlightReducer({ type: 'UPDATE_TRAVELLER', payload: item.fName })}
      />
    );
  };

  const renderRoutes = ({ item }) => {
    const isSelected = flightState.source === item.origin;
    return (
      <RectButton
        isSelected={isSelected}
        label={`${item.origin}-${item.destination}`}
        onPress={() => dispatchToFlightReducer({ type: 'UPDATE_SOURCE', payload: item.origin })}
      />
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

  const renderTabBar = (props) => {
    return (
      <View>
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: appColors.pink, height: 4 }}
          style={{ backgroundColor: 'transparent' }}
          renderLabel={({ route }) => (
            <Text style={{ color: appColors.black, margin: 8, fontSize: 18 }}>{route.title}</Text>
          )}
        />
        <FlatList
          data={allTravellers}
          renderItem={renderTravellers}
          horizontal
          style={{ height: 45 }}
        />
        <FlatList data={getRoutes()} renderItem={renderRoutes} horizontal style={{ height: 45 }} />
      </View>
    );
  };

  const handleBottomSheetOpen = () => {
    setIsBottomSheetOpen(true);
  };
  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };
  
  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('ssrAdon')} />

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{ backgroundColor: appColors.white }}
          renderTabBar={renderTabBar}
        />

        <TotalPriceFooter
          currency={currency}
          price={totalPrice}
          onPress={() => refRBSheet?.current?.open()}
        />

        {isBottomSheetOpen && <View style={styles.transparentCover} />}

        <BottomSheet
          refRBSheet={refRBSheet}
          onOpen={handleBottomSheetOpen}
          onClose={handleBottomSheetClose}
        >
          <ReviewBooking
            onClose={() => refRBSheet.current?.close()}
            selectedSeats={`${selectedSeats.map((seat) => seat.code).join(', ')}`}
            seatCount={`${selectedSeats?.length}/${allTravellers?.length * getRoutes()?.length || 0}`}
            onPress={() => {}}
          />
        </BottomSheet>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  transparentCover: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
