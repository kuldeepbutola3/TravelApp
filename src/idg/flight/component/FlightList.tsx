import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { ApptNavigationProp } from 'src/navigation/RootNav';
import { useAuraTranslation } from 'src/utils/i18n';
import { FlightSet } from '../FlightModel';
import { FlightViewModel, makeFlightViewModel } from '../FlightViewModel';
import { FlightCard } from './FlightCard';

interface FlightListProps {
  items: Array<FlightSet>;
}
interface Item {
  id: string;
  viewModel: FlightViewModel;
}
export const FlightList: FC<FlightListProps> = ({ items }) => {
  const { t } = useAuraTranslation();

  const navigation = useNavigation<ApptNavigationProp>();

  const cellTapped = useCallback(() => navigation.navigate('ReviewFlight'), [navigation]);

  const renderItem = useCallback<ListRenderItem<Item>>(({ item }) => <CardItem {...item} />, []);

  const CardItem: React.FC<Item> = React.memo(
    ({ viewModel }) => <FlightCard {...viewModel} onPress={cellTapped} />,
    (prevProp, nextProp) => prevProp.viewModel.item === nextProp.viewModel.item
  );

  if (!items.length) {
    return null;
  }

  // rowData contains an array of Item objects.
  const rowData: Array<Item> = [];
  items.map((i, index) => {
    const obj = makeFlightViewModel(i, t);
    obj && rowData.push({ id: `${index}`, viewModel: obj });
  });

  return <FlatList data={rowData} renderItem={renderItem} />;
};
