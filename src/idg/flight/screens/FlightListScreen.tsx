import React, { FC, useCallback, useEffect } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { Text } from 'src/components/Text';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { doFetchRefreshToken } from 'src/idg/session/sessionSlice';
import { fetchFlight } from 'src/idg/flight/flightSlice';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Icon } from 'react-native-elements';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { ApptNavigationProp } from 'src/navigation/RootNav';
import { FlightList } from '../component/FlightList';
import { FlightHeader } from '../component/FlightHeader';

export const FlightListScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { flightDetail } = useSliceSelector('flight');
  console.log('flightDetail--------1', JSON.stringify(flightDetail));
  useEffect(() => {
    dispatch(doFetchRefreshToken()).then((_) => {
      dispatch(fetchFlight());
    });
  }, [dispatch]);

  const buttonArray: Array<TabButtonProps> = [
    { key: 1, iconName: 'filter', title: t('filter') },
    { key: 2, iconName: 'more-horiz', title: t('nonStop') },
    { key: 3, iconName: 'access-time', title: t('time') },
    {
      key: 4,
      iconName: 'local-airport',
      title: t('airline'),
    },
    { key: 5, iconName: 'vertical-align-top', title: t('price') },
  ];
  const tabButtonTapped = useCallback((key: number) => {
    console.log('key..', key);
  }, []);

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  const data = flightDetail?.results[0];
  console.log('data', data);
  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <FlightHeader onPressBack={onPressBack} response={flightDetail} />
        <View style={styles.container}>{Array.isArray(data) && <FlightList items={data} />}</View>
        <View style={styles.tabContainer}>
          {buttonArray.map((item) => (
            <View style={styles.tabInnerContainer} key={`TabBarButton${item.key}`}>
              <Divider />
              <TabButtons {...item} onPress={tabButtonTapped} />
              <Divider />
            </View>
          ))}
        </View>
      </SafeAreaView>
    </Screen>
  );
};
interface TabButtonProps {
  key: number;
  iconName: string;
  title: string;
  onPress?: (key: number) => void;
}
const TabButtons: FC<TabButtonProps> = ({ key, iconName, onPress, title }) => {
  const tap = useCallback(() => onPress && onPress(key), [onPress, key]);
  return (
    <TouchableOpacity onPress={tap} style={styles.tabBarTouch}>
      <Icon name={iconName} />
      <Text>{title}</Text>
    </TouchableOpacity>
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
  tabBarTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
