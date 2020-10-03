import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
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
  multiple: boolean;
  viewModel: Array<FlightViewModel>;
}
export const FlightList: FC<FlightListProps> = ({ items }) => {
  const { t } = useAuraTranslation();

  const navigation = useNavigation<ApptNavigationProp>();

  const cellTapped = useCallback(
    (flightSet: FlightSet) => navigation.navigate('ReviewFlight', { param: flightSet }),
    [navigation]
  );
  const renderItem = useCallback<ListRenderItem<Item>>(({ item }) => <CardItem {...item} />, []);

  const CardItem: React.FC<Item> = React.memo(
    ({ viewModel, multiple }) => (
      <View style={style.container}>
        {viewModel.map((vM) => (
          <View style={style.subContainer}>
            <FlightCard {...vM} isMultiple={multiple} />
          </View>
        ))}
      </View>
    ),
    (prevProp, nextProp) => prevProp.viewModel === nextProp.viewModel
  );

  if (!items.length) {
    return null;
  }

  // rowData contains an array of Item objects.
  const rowData: Array<Item> = [];
  items.map((i, index) => {
    const obj = makeFlightViewModel(i, t, cellTapped);
    const isMultiple = (obj?.length ?? 0) > 1;

    obj && rowData.push({ id: `${index}`, viewModel: obj, multiple: isMultiple });
  });

  return <FlatList data={rowData} renderItem={renderItem} />;
};

const style = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  subContainer: { flex: 1 },
});
