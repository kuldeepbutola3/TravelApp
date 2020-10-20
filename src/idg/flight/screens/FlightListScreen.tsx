import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { Text } from 'src/components/Text';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { doFetchRefreshToken } from 'src/idg/session/sessionSlice';
import { fetchFlight } from 'src/idg/flight/flightSlice';
import {
  StyleSheet,
  View,
  ViewStyle,
  Dimensions,
  ViewProps,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider, ListItem, Tooltip, TooltipProps } from 'react-native-elements';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { FlightList } from '../component/FlightList';
import { FlightHeader } from '../component/FlightHeader';
import { TabButtonProps, TabButtons } from '../component/FlightTabButton';
import { appColors } from 'src/styles/appColors';
import { FlightDepartureFilter } from '../component/FlightDepartureFilter';
import { GetFlightParam } from '../flightApi';
import { FilterModel, TimeSplit } from '../filterModel';
import { FlightSet } from '../FlightModel';
import { formatDate } from 'src/utils/date-formatter';
import { Button as _Button } from 'src/components/Button';
export interface FlightListScreenProps {
  param: GetFlightParam;
}
export const FlightListScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { flightDetail } = useSliceSelector('flight');
  const { param } = useParams<AppRoutes, 'FlightSearch'>();
  console.log('flightDetail--------1', JSON.stringify(flightDetail?.results?.length));

  const tooltipRefNonStop = useRef<Tooltip>(null);
  const tooltipRefTime = useRef<Tooltip>(null);
  const tooltipRefAirline = useRef<Tooltip>(null);

  /**max min range */
  const maxPrice =
    flightDetail?.results && flightDetail?.results?.length > 1
      ? Math.max(
          flightDetail?.results[0][flightDetail?.results[0].length - 1].fare.publishedFare ?? 0,
          flightDetail?.results[1][flightDetail?.results[1].length - 1].fare.publishedFare ?? 0
        )
      : flightDetail?.results[0][flightDetail?.results[0].length - 1].fare.publishedFare ?? 0;

  const minPrice =
    flightDetail?.results && flightDetail?.results?.length > 1
      ? Math.min(
          flightDetail?.results[0][0].fare.publishedFare ?? 0,
          flightDetail?.results[1][0].fare.publishedFare ?? 0
        )
      : flightDetail?.results[0][0].fare.publishedFare ?? 0;
  const [maxRange, setMaxRange] = useState(maxPrice);
  const [minRange, setMinRange] = useState(minPrice);

  useEffect(()=>{
if (minRange === 0 && minRange === 0 && maxPrice !== 0 && minPrice !== 0) {
setMaxRange(maxPrice);
setMinRange(minPrice);
}
  },[minRange,minRange,maxPrice,minPrice])

  /**  filter states */
  const [priceFilte, setPriceFilte] = useState(false);
  const [stops, setStops] = useState(-1);
  const [flightArray, setFlightArray] = useState([] as Array<string>);
  const [timeSelected1, setTimeSelected1] = useState(undefined as TimeSplit | undefined);
  const [timeSelected2, setTimeSelected2] = useState(undefined as TimeSplit | undefined);

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

  useEffect(() => {
    dispatch(doFetchRefreshToken()).then((_) => {
      dispatch(fetchFlight(param));
    });
  }, [dispatch, param]);

  const buttonArray: Array<TabButtonProps> = [
    { id: 0, iconName: 'filter', title: t('filter') },
    { id: 1, iconName: 'more-horiz', title: t('nonStop') },
    { id: 2, iconName: 'access-time', title: t('time') },
    {
      id: 3,
      iconName: 'local-airport',
      title: t('airline'),
    },
    {
      id: 4,
      iconName: !priceFilte ? 'vertical-align-bottom' : 'vertical-align-top',
      title: t('price'),
    },
  ];

  const filterReturnParams = useCallback(
    (params: FilterModel) => {
      setMaxRange(params?.priceRange?.higher ?? 0);
      setMinRange(params?.priceRange?.lower ?? 0);
      setTimeSelected1(params.timeSplit1);
      setTimeSelected2(params.timeSplit2);
      setStops(params?.stops ?? -1);
      setFlightArray(params?.flightArray ?? []);
    },
    [setMaxRange, setMinRange, setTimeSelected1, setTimeSelected2, setStops, setFlightArray]
  );

  const navigateToFilter = useCallback(() => {
    const params: FilterModel = {
      priceRange: {
        lower: minRange,
        higher: maxRange,
      },
      stops,
      timeSplit2: timeSelected2,
      timeSplit1: timeSelected1,
      flightArray,
    };
    navigation.navigate('FlightFilter', { param: params, onPress: filterReturnParams });
  }, [
    navigation,
    filterReturnParams,
    minRange,
    maxRange,
    stops,
    timeSelected1,
    timeSelected2,
    flightArray,
  ]);

  const tabButtonTapped = useCallback(
    (key: number) => {
      if (key === 0) {
        navigateToFilter();
      } else if (key === 1) {
        tooltipRefNonStop.current?.toggleTooltip();
      } else if (key === 2) {
        tooltipRefTime.current?.toggleTooltip();
      } else if (key === 3) {
        tooltipRefAirline.current?.toggleTooltip();
      } else if (key === 4) {
        setPriceFilte(!priceFilte);
      }
    },
    [
      tooltipRefNonStop,
      tooltipRefTime,
      tooltipRefAirline,
      setPriceFilte,
      priceFilte,
      navigateToFilter,
    ]
  );

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  const FlightListView: FC<ViewProps> = ({ style }) => {
    const [flightA, setFlightA] = useState(flightArray);

    const applyTapped = useCallback(() => {
      setFlightArray(flightA);
      tooltipRefAirline.current?.toggleTooltip();
    }, [flightA]);

    const renderItem = useCallback<ListRenderItem<string>>(
      ({ item }) => {
        const listTapped = (items: string) => {
          return () => {
            const ar = [...flightA];
            const indx = ar.indexOf(items);
            if (indx >= 0) {
              ar.splice(indx, 1);
              setFlightA(ar);
            } else {
              setFlightA([...flightA, items]);
            }
          };
        };
        return (
          <ListItem
            title={item}
            rightIcon={{
              name: flightA.indexOf(item) >= 0 ? 'check-box' : 'check-box-outline-blank',
              color: appColors.pink,
            }}
            onPress={listTapped(item)}
          />
        );
      },
      [flightA]
    );

    return (
      <View style={[style, styles.filterContainer]}>
        {/* top bar */}
        <View style={styles.filterBar}>
          <Text style={styles.filterHeaderTitle}>{t('airline')}</Text>
          <Button
            type="clear"
            icon={{ name: 'close', color: appColors.pink }}
            onPress={tooltipRefAirline.current?.toggleTooltip}
          />
        </View>
        <FlatList
          style={{}}
          data={flightFilterList}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${index}`}
        />
        <_Button
          containerStyle={styles.apply}
          title={t('apply')}
          bgColor={appColors.pink}
          onPress={applyTapped}
        />
      </View>
    );
  };

  const NonStopView: FC<ViewProps> = ({ style }) => {
    const [stopsInner, setStopsInner] = useState(stops);

    const onPress = (value: number) => () => setStopsInner(value);

    const applyTapped = useCallback(() => {
      setStops(stopsInner);
      tooltipRefNonStop.current?.toggleTooltip();
    }, [stopsInner]);

    return (
      <View style={[style, styles.filterContainer]}>
        {/* top bar */}
        <View style={styles.filterBar}>
          <Text style={styles.filterHeaderTitle}>{t('stops')}</Text>
          <Button
            type="clear"
            icon={{ name: 'close', color: appColors.pink }}
            onPress={tooltipRefNonStop.current?.toggleTooltip}
          />
        </View>

        {/* 2 button  */}
        <View style={styles.filterSegment}>
          <View style={styles.filterSegmentInnerView}>
            <Button
              type="clear"
              buttonStyle={stopsInner === 0 && styles.selected}
              titleStyle={stopsInner === 0 ? styles.titleSelected : styles.titleUnSelected}
              title={`0 ${t('nonStop')}`}
              onPress={onPress(0)}
            />
          </View>
          <View style={styles.filterSegmentInnerView}>
            <Button
              buttonStyle={stopsInner === 1 && styles.selected}
              titleStyle={stopsInner === 1 ? styles.titleSelected : styles.titleUnSelected}
              type="clear"
              title={`1 ${t('stop')}`}
              onPress={onPress(1)}
            />
          </View>
        </View>

        {/* 1 button  */}
        <View style={styles.filterSegment}>
          <View style={styles.filterSegmentInnerView}>
            <Button
              type="clear"
              buttonStyle={stopsInner === 2 && styles.selected}
              titleStyle={stopsInner === 2 ? styles.titleSelected : styles.titleUnSelected}
              title={`2+ ${t('stops')}`}
              onPress={onPress(2)}
            />
          </View>
          <View style={styles.filterSegmentInnerView}>
            {/* <Button
              type="clear"
              // style={stopsInner === 2 && styles.selected}
              title={`${t('clear')}`}
              onPress={onPress(-1)}
            /> */}
          </View>
        </View>

        {/* Apply button  */}
        <View style={styles.filterSegment}>
          <View style={styles.filterSegmentInnerView} />
          <View style={styles.filterSegmentInnerView}>
            <Button
              buttonStyle={styles.selected}
              type="solid"
              title={`${t('apply')}`}
              onPress={applyTapped}
            />
          </View>
        </View>
      </View>
    );
  };

  const TimeList: FC<ViewProps> = ({ style }) => {
    const [t1, setT1] = useState(timeSelected1 as TimeSplit | undefined);
    const [t2, seT2] = useState(timeSelected2 as TimeSplit | undefined);

    const applyTapped = useCallback(() => {
      setTimeSelected2(t2);
      setTimeSelected1(t1);
      tooltipRefTime.current?.toggleTooltip();
    }, [t2, t1]);
    if (!flightDetail?.results) {
      return null;
    }
    return (
      <View style={style}>
        <FlightDepartureFilter
          type={t1}
          // viewStyle={[styles.timeListInner]}
          city={flightDetail?.results[0][0].segments[0][0].origin?.airport?.cityName ?? ''}
          close={tooltipRefTime.current?.toggleTooltip}
          timeSelected={setT1}
        />
        {flightDetail?.results.length > 1 && (
          <FlightDepartureFilter
            type={t2}
            // viewStyle={styles.timeListInner}
            city={flightDetail?.results[1][0].segments[0][0].origin?.airport?.cityName ?? ''}
            // close={tooltipRefTime.current?.toggleTooltip}
            timeSelected={seT2}
          />
        )}
        <_Button
          containerStyle={styles.apply}
          title={t('apply')}
          bgColor={appColors.pink}
          onPress={applyTapped}
        />
      </View>
    );
  };

  const popOverView = (key: number): TooltipProps => {
    if (key === 1) {
      return {
        ...styles.nonStopStyle,
        popover: <NonStopView style={styles.nonStopStyle} />,
      };
    } else if (key === 2) {
      if ((flightDetail?.results.length ?? 0) > 1) {
        return {
          ...styles.timeList2,
          popover: <TimeList style={styles.timeList2} />,
        };
      } else {
        return {
          ...styles.timeList,
          popover: <TimeList style={styles.timeList} />,
        };
      }
    }
    return {
      ...styles.flightList,
      popover: <FlightListView style={styles.flightList} />,
    };
  };

  /** applying filtes */
  const length = flightDetail?.results ? flightDetail?.results?.length : 0;
  const boolValue = length > 1;

  const resultsArray = [];

  /** get stops filter */
  const getFilterData = () => {
    const arrayStops: Array<Array<FlightSet>> = [];
    flightDetail?.results.map((data) =>
      arrayStops.push(data.filter((i) => i.segments[0].length === stops + 1))
    );
    return arrayStops;
  };

  /** time filter */
  const getTimeFilterData = (itm: Array<Array<FlightSet>>) => {
    // const startTime = formatDate(firstSegment.origin.depTime, 'HH:mm');
    const array: Array<Array<FlightSet>> = [];
    if (timeSelected1 && itm.length) {
      const array1 = itm[0];
      array.push(
        array1.filter((i) => {
          const time = Number(formatDate(i.segments[0][0].origin.depTime, 'HH'));
          console.log('timeeeee', time);
          if (timeSelected1 === '12-6am') {
            return time > 0 && time < 5;
          } else if (timeSelected1 === '6-12am') {
            return time > 6 && time < 11;
          } else if (timeSelected1 === '12-6pm') {
            return time > 11 && time < 17;
          } else if (timeSelected1 === '6-12pm') {
            return time > 18 && time < 24;
          }
          return true;
        })
      );
    } else {
      if (itm.length) {
        array.push(itm[0]);
      }
    }

    if (timeSelected2 && itm.length > 1) {
      const array1 = itm[1];
      array.push(
        array1.filter((i) => {
          const time = Number(formatDate(i.segments[0][0].origin.depTime, 'HH'));
          if (timeSelected2 === '12-6am') {
            return time > 0 && time < 5;
          } else if (timeSelected1 === '6-12am') {
            return time > 6 && time < 11;
          } else if (timeSelected1 === '12-6pm') {
            return time > 11 && time < 17;
          } else if (timeSelected1 === '6-12pm') {
            return time > 18 && time < 24;
          }
          return true;
        })
      );
    } else {
      if (itm.length > 1) {
        array.push(itm[1]);
      }
    }

    return array;
  };

  /** price range filter */
  const getPriceRangeData = (itm: Array<Array<FlightSet>>) => {
    const array: Array<Array<FlightSet>> = [];
    itm.map((a) => {
      array.push(
        a.filter((i) => {
          const price = i.fare.publishedFare;
          return minPrice && maxPrice ? price >= minRange && price <= maxRange : true;
        })
      );
    });
    return array;
  };

  /** flight search filter */
  const filterWithFlightName = (itm: Array<Array<FlightSet>>) => {
    if (flightArray.length > 0) {
      const flghtSearch: Array<Array<FlightSet>> = [];
      itm.map((data) => {
        flghtSearch.push(
          data.filter((i) => flightArray.indexOf(i.segments[0][0].airline?.airlineName ?? '') >= 0)
        );
      });
      return flghtSearch;
    }
    return itm;
  };

  if (flightDetail?.results && Array.isArray(flightDetail?.results)) {
    /** applying stops filter */
    const stopFilter = stops === -1 ? [...flightDetail?.results] : getFilterData();

    /** applying flight search */
    const stopData = filterWithFlightName(stopFilter);

    /** applying time filter */
    const timeData = getTimeFilterData(stopData);

    /** applying price range */
    const filteredData = getPriceRangeData(timeData);

    /** applying price filter accending decending*/
    if (priceFilte && filteredData) {
      filteredData.map((d) => {
        resultsArray.push([...d].reverse());
      });
    } else {
      resultsArray.push(...filteredData);
    }
  }
  var RandomNumber = Math.floor(Math.random() * 10000) + 1;
  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <FlightHeader onPressBack={onPressBack} response={param} />
        <View style={styles.container}>
          {resultsArray.map((i,index) => (
            <FlightList key={`FlightKey${RandomNumber}--${index}`} items={i} show={boolValue} />
          ))}
        </View>
        {flightDetail?.results && (
          <View style={styles.tabContainer}>
            {buttonArray.map((item) => (
              <View style={styles.tabInnerContainer} key={`TabBarButton${item.id}`}>
                <Divider />
                {item.id !== 0 && item.id !== 4 && (
                  <Tooltip
                    ref={
                      item.id === 1
                        ? tooltipRefNonStop
                        : item.id === 2
                        ? tooltipRefTime
                        : tooltipRefAirline
                    }
                    {...popOverView(item.id)}
                    closeOnlyOnBackdropPress
                    overlayColor="rgba(0,0,0,0.5)"
                  />
                )}
                <TabButtons {...item} onPress={tabButtonTapped} />
                <Divider />
              </View>
            ))}
          </View>
        )}
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  } as ViewStyle,

  tabContainer: {
    height: 70,
    flexDirection: 'row',
  } as ViewStyle,
  tabInnerContainer: {
    flex: 1,
  } as ViewStyle,
  tabButton: {
    flex: 1,
  },
  nonStopStyle: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 4 + 20 + 50,
    backgroundColor: 'white',
  },
  flightList: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 2,
    backgroundColor: 'white',
  },
  // timeListInner: {
  //   width: Dimensions.get('window').width - 20,
  //   // height: (Dimensions.get('window').height * 3) / 16,
  //   backgroundColor: 'white',
  // },
  timeList: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 4 + 80,
    backgroundColor: 'white',
  },
  timeList2: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 3 + 60 + 80,
    backgroundColor: 'white',
  },
  // filters
  filterContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterBar: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterHeaderTitle: { fontSize: 15, color: appColors.pink },

  filterSegment: {
    flexDirection: 'row',
    marginTop: 12,
  },
  filterSegmentInnerView: { flex: 1, paddingHorizontal: 20 },
  selected: { backgroundColor: appColors.pink },
  titleSelected: { color: 'white' },
  titleUnSelected: { color: 'black' },

  //button apply
  apply: { padding: 20 },
});
