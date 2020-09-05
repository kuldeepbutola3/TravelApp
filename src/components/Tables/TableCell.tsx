import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {flatten, borderStyle, horizontalAlignmentStyle} from './util';
import {BaseTableCellProps} from './types';

export const TableCell: React.FC<BaseTableCellProps> = ({
  containerStyle,
  children,
  borderWidth,
  borders,
  horizontalAlignment,
}) => {
  return (
    <View
      style={flatten(
        styles.cell,
        borderStyle(borders, borderWidth),
        containerStyle,
        horizontalAlignmentStyle(horizontalAlignment),
      )}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    paddingHorizontal: 10,
    minHeight: 30,
    paddingVertical: 7,
    justifyContent: 'center',
  } as ViewStyle,
});
