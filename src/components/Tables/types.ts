import {ViewStyle, StyleProp} from 'react-native';

export type ColumnHeading = string;
export type DataValue = string | number | boolean | Date;

export type Border = 'top' | 'right' | 'bottom' | 'left';
export type BorderSetting = Border[];
export type BorderStyle = Required<
  Pick<
    ViewStyle,
    | 'borderTopWidth'
    | 'borderRightWidth'
    | 'borderBottomWidth'
    | 'borderLeftWidth'
  >
>;

export type BaseTableCellProps = {
  containerStyle?: StyleProp<ViewStyle>;
  horizontalAlignment?: 'left' | 'center' | 'right';
  borders?: BorderSetting;
  borderColor?: ViewStyle['borderColor'];
  borderWidth?: ViewStyle['borderWidth'];
};
