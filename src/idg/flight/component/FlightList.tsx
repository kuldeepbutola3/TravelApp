import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { ApptNavigationProp } from 'src/navigation/RootNav';
import { useAuraTranslation } from 'src/utils/i18n';
import { FlightSet } from '../FlightModel';
import { FlightViewModel, makeFlightViewModel } from '../FlightViewModel';
import { FlightCardList } from './FlightCardList';

interface FlightListProps {
  isMultiple: boolean;
  items: Array<FlightSet>;
}
interface Item {
  id: string;
  viewModel: Array<FlightViewModel>;
}
export const FlightList: FC<FlightListProps> = ({ items, isMultiple }) => {
  const { t } = useAuraTranslation();

  const navigation = useNavigation<ApptNavigationProp>();

  const cellTapped = useCallback(
    (flightSet: FlightSet) => navigation.navigate('ReviewFlight', { param: flightSet }),
    [navigation]
  );
  const renderItem = useCallback<ListRenderItem<Item>>(({ item }) => <CardItem {...item} />, []);

  const CardItem: React.FC<Item> = ({ viewModel }) => (
    <FlightCardList data={viewModel} isMultiple={isMultiple} />
  );

  if (!items.length) {
    return null;
  }

  // rowData contains an array of Item objects.
  const rowData: Array<Item> = [];
  items.map((i, index) => {
    const obj = makeFlightViewModel(i, t, cellTapped);
    obj && rowData.push({ id: `${index}`, viewModel: obj });
  });

  return <FlatList data={rowData} renderItem={renderItem} />;
};
