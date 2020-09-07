import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';
import { TableData } from '../../components/Tables/TableData';
import { TableHeading } from '../../components/Tables/TableHeading';
import { ColumnHeading, DataValue } from './types';
import { flatten } from './util';

export type CellInfo = { heading: ColumnHeading; value: DataValue };
export const toCellInfo = <T extends { [key: string]: DataValue }, K extends string & keyof T>(
  orderedKeys: K[],
  object: T
): CellInfo[] => orderedKeys.map((k) => ({ heading: k, value: '' + object[k] }));

type SingleRecordTableProps = {
  cells: CellInfo[];
  style?: StyleProp<ViewStyle>;
};

export const SingleRecordTable: React.FC<SingleRecordTableProps> = ({ cells, style }) => {
  return (
    <View style={flatten(styles.container, style)}>
      {cells.map((cell) => (
        <View key={`single.rowDataContainer.${cell.heading}`} style={[styles.row]}>
          <TableHeading key={`single.heading.${cell.heading}`} horizontalAlignment={'right'}>
            {cell.heading}
          </TableHeading>
          <TableData key={`single.rowData.${cell.heading}.${cell.value}`}>{cell.value}</TableData>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
});
