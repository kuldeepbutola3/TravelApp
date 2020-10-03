import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
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
import { ApptNavigationProp } from 'src/navigation/RootNav';
import { FlightList } from '../component/FlightList';
import { FlightHeader } from '../component/FlightHeader';
import { TabButtonProps, TabButtons } from '../component/FlightTabButton';
import { appColors } from 'src/styles/appColors';
import { FlightDepartureFilter, TimeSplit } from '../component/FlightDepartureFilter';

export const FlightListScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { flightDetail } = useSliceSelector('flight');

  console.log('flightDetail--------1', JSON.stringify(flightDetail?.results?.length));

  const tooltipRefNonStop = useRef<Tooltip>(null);
  const tooltipRefTime = useRef<Tooltip>(null);
  const tooltipRefAirline = useRef<Tooltip>(null);

  /**  filter states */
  const [priceFilte, setPriceFilte] = useState(false);
  const [stops, setStops] = useState(-1);
  const [flightArray, setFlightArray] = useState([] as Array<string>);

  /** getting filter arrray for response  */
  const uniqueFlightSet = flightDetail?.uniqueFlightSet;
  const uniqueFlightSetList = Array.isArray(uniqueFlightSet) ? uniqueFlightSet : [];
  const flightFilterList: Array<string> = [];
  uniqueFlightSetList?.map((i) =>
    i.segments.map((j) => j.map((k) => flightFilterList.push(k.airline.airlineName)))
  );

  useEffect(() => {
    dispatch(doFetchRefreshToken()).then((_) => {
      dispatch(fetchFlight());
    });

    // navigation.navigate('ReviewFlight', { param: null });
  }, [dispatch]);

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
  const tabButtonTapped = useCallback(
    (key: number) => {
      if (key === 1) {
        tooltipRefNonStop.current?.toggleTooltip();
      } else if (key === 2) {
        tooltipRefTime.current?.toggleTooltip();
      } else if (key === 3) {
        tooltipRefAirline.current?.toggleTooltip();
      } else if (key === 4) {
        setPriceFilte(!priceFilte);
      }
    },
    [tooltipRefNonStop, tooltipRefTime, tooltipRefAirline, setPriceFilte, priceFilte]
  );

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  const FlightListView: FC<ViewProps> = ({ style }) => {
    const renderItem = useCallback<ListRenderItem<string>>(
      ({ item }) => (
        <ListItem
          title={item}
          rightIcon={{
            name: flightArray.indexOf(item) >= 0 ? 'check-box' : 'check-box-outline-blank',
            color: appColors.pink,
          }}
          onPress={() => {
            const ar = [...flightArray];
            const indx = ar.indexOf(item);
            if (indx >= 0) {
              ar.splice(indx);
              setFlightArray(ar);
            } else {
              setFlightArray([...flightArray, item]);
            }
          }}
        />
      ),
      []
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
    const [timeSelected, setTimeSelected] = useState(undefined as TimeSplit | undefined);
    return (
      <View style={style}>
        <FlightDepartureFilter
          type={timeSelected}
          // viewStyle={[styles.timeListInner]}
          city={'delhi'}
          close={tooltipRefTime.current?.toggleTooltip}
          timeSelected={setTimeSelected}
        />
        <FlightDepartureFilter
          type={timeSelected}
          // viewStyle={styles.timeListInner}
          city={'mumbai'}
          // close={tooltipRefTime.current?.toggleTooltip}
          timeSelected={setTimeSelected}
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
      return {
        ...styles.timeList,
        popover: <TimeList style={styles.timeList} />,
      };
    }
    return {
      ...styles.flightList,
      popover: <FlightListView style={styles.flightList} />,
    };
  };

  const data = flightDetail?.results[0];

  let filteredData = stops === -1 ? data : data?.filter((i) => i.segments[0].length === stops + 1);
  if (priceFilte && filteredData) {
    filteredData = [...filteredData].reverse();
  }

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <FlightHeader onPressBack={onPressBack} response={flightDetail} />
        <View style={styles.container}>
          {Array.isArray(filteredData) && <FlightList items={filteredData} />}
        </View>
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
    height: Dimensions.get('window').height / 4 + 20,
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
    height: Dimensions.get('window').height / 4 + 60,
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
});
