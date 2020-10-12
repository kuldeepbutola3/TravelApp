import React, { useCallback, useState } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { Text } from 'src/components/Text';
import { Button, ListItem } from 'react-native-elements';
import { Button as _Button } from 'src/components/Button';
import { FilterModel, TimeSplit } from '../filterModel';
import { appColors } from 'src/styles/appColors';
import { FlightDepartureFilter } from '../component/FlightDepartureFilter';
import { useSliceSelector } from 'src/redux/hooks';

export interface FlightFilterScreenProps {
  param: FilterModel;
  onPress: (param: FilterModel) => void;
}

export const FlightFilterScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param, onPress } = useParams<AppRoutes, 'FlightFilter'>();
  const { flightDetail } = useSliceSelector('flight');
  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  //   const _onValueChange = useCallback(() => {}, [onPress, onPressBack]);

  const [stops, setStops] = useState(param.stops ?? -1);
  const [timeSelected1, setTimeSelected1] = useState(param.timeSplit1 as TimeSplit | undefined);
  const [timeSelected2, setTimeSelected2] = useState(param.timeSplit2 as TimeSplit | undefined);

  const maxPrice =
    flightDetail?.results && flightDetail?.results?.length > 1
      ? Math.max(
          flightDetail?.results[0][flightDetail?.results[0].length - 1].fare.publishedFare ?? 0,
          flightDetail?.results[1][flightDetail?.results[1].length - 1].fare.publishedFare ?? 0
        )
      : flightDetail?.results[0][flightDetail?.results[0].length - 1].fare.publishedFare;

  const minPrice =
    flightDetail?.results && flightDetail?.results?.length > 1
      ? Math.min(
          flightDetail?.results[0][0].fare.publishedFare ?? 0,
          flightDetail?.results[1][0].fare.publishedFare ?? 0
        )
      : flightDetail?.results[0][0].fare.publishedFare;

  console.log('max..min', maxPrice, minPrice);

  const [maxRang, setMaxRange] = useState(param.priceRange?.higher ?? maxPrice ?? 0);
  const [minRange, setMinRange] = useState(param.priceRange?.lower ?? minPrice ?? 0);

  const [flightArray, setFlightArray] = useState(param.flightArray ?? ([] as Array<string>));

  const clearAllTapped = useCallback(() => {
    onPress({});
    setStops(-1);
    setTimeSelected1(undefined);
    setTimeSelected2(undefined);

    setFlightArray([]);

    setMaxRange(0);
    setMinRange(0);
  }, [onPress]);

  /** getting filter arrray for response  */
  const uniqueFlightSet = flightDetail?.uniqueFlightSet;
  const uniqueFlightSetList = Array.isArray(uniqueFlightSet) ? uniqueFlightSet : [];
  const flightFilterList: Array<string> = [];
  uniqueFlightSetList?.map((i) =>
    i.segments.map((j) =>
      j.map((k) => {
        const ind = flightFilterList.indexOf(k.airline.airlineName);
        if (ind < 0) {
          flightFilterList.push(k.airline.airlineName);
        }
      })
    )
  );

  const _onPressStops = (value: number) => () => setStops(value);

  const applyTapped = useCallback(() => {
    const dict: FilterModel = {
      priceRange: {
        higher: maxRang,
        lower: minRange,
      },
      stops,
      timeSplit2: timeSelected2,
      timeSplit1: timeSelected1,
      flightArray,
    };
    onPress(dict);
    onPressBack();
  }, [onPress, timeSelected1, timeSelected2, flightArray, stops, maxRang, minRange, onPressBack]);

  const _onPressListItem = (item: string) => {
    return () => {
      const ar = [...flightArray];
      const indx = ar.indexOf(item);
      if (indx >= 0) {
        ar.splice(indx, 1);
        setFlightArray(ar);
      } else {
        setFlightArray([...flightArray, item]);
      }
    };
  };
  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack}>
          <View style={styles.headerView}>
            <Text style={styles.text}>{t('filter')}</Text>
            <_Button
              bgColor={appColors.transparent}
              title={t('clearAll')}
              onPress={clearAllTapped}
            />
          </View>
        </Header>
        <ScrollView style={styles.scrollView}>
          <View style={styles.filterBar}>
            <Text style={styles.filterHeaderTitle}>{t('stops')}</Text>
          </View>

          {/* 2 button  */}
          <View style={styles.filterSegment}>
            <View style={styles.filterSegmentInnerView}>
              <Button
                type="clear"
                buttonStyle={stops === 0 ? styles.selected : {}}
                titleStyle={stops === 0 ? styles.titleSelected : styles.titleUnSelected}
                title={`0 ${t('nonStop')}`}
                onPress={_onPressStops(0)}
              />
            </View>
            <View style={styles.filterSegmentInnerView}>
              <Button
                buttonStyle={stops === 1 ? styles.selected : {}}
                titleStyle={stops === 1 ? styles.titleSelected : styles.titleUnSelected}
                type="clear"
                title={`1 ${t('stop')}`}
                onPress={_onPressStops(1)}
              />
            </View>
            <View style={styles.filterSegmentInnerView}>
              <Button
                buttonStyle={stops === 2 ? styles.selected : {}}
                titleStyle={stops === 2 ? styles.titleSelected : styles.titleUnSelected}
                type="clear"
                title={`2 ${t('stop')}`}
                onPress={_onPressStops(2)}
              />
            </View>
          </View>

          {/* time line */}
          <View style={styles.timeContainer}>
            <FlightDepartureFilter
              type={timeSelected1}
              city={flightDetail?.results[0][0].segments[0][0].origin?.airport?.cityName ?? ''}
              timeSelected={setTimeSelected1}
            />
            {flightDetail?.results && flightDetail?.results?.length > 1 && (
              <FlightDepartureFilter
                type={timeSelected2}
                city={flightDetail?.results[1][0].segments[0][0].origin?.airport?.cityName ?? ''}
                timeSelected={setTimeSelected2}
              />
            )}
          </View>

          {/* flight list
           */}
          <View style={styles.filterContainer}>
            {/* top bar */}
            <View style={styles.filterBar}>
              <Text style={styles.filterHeaderTitle}>{t('airline')}</Text>
            </View>
            {flightFilterList.map((item, index) => {
              return (
                <ListItem
                  key={`listItem-${index}`}
                  title={item}
                  rightIcon={{
                    name: flightArray.indexOf(item) >= 0 ? 'check-box' : 'check-box-outline-blank',
                    color: appColors.pink,
                  }}
                  onPress={_onPressListItem(item)}
                />
              );
            })}
          </View>
        </ScrollView>
        <_Button
          containerStyle={styles.applyBttn}
          bgColor={appColors.pink}
          title={t('apply')}
          onPress={applyTapped}
        />
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },

  //   filter
  filterBar: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  filterHeaderTitle: { fontSize: 15, color: appColors.pink },
  filterSegment: {
    flexDirection: 'row',
    marginTop: 12,
  },
  filterSegmentInnerView: { flex: 1, paddingHorizontal: 5 },
  selected: { backgroundColor: appColors.pink },
  titleSelected: { color: 'white' },
  titleUnSelected: { color: 'black' },

  //   timeFiler
  timeContainer: {
    marginVertical: 20,
  },

  //flight list
  filterContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },

  applyBttn: {
    marginHorizontal: 20,
  },
});
