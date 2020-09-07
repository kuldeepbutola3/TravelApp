import { ViewStyle, StyleProp, StyleSheet, TextStyle } from 'react-native';
import { BaseTableCellProps, BorderStyle, BorderSetting, Border } from './types';

export const horizontalAlignmentStyle = (
  alignment?: BaseTableCellProps['horizontalAlignment']
): ViewStyle => {
  switch (alignment) {
    case 'left':
      return { alignItems: 'flex-start' };
    case 'center':
      return { alignItems: 'center' };
    case 'right':
      return { alignItems: 'flex-end' };
    default:
      return {};
  }
};

const defaultBorders = (width: number) =>
  ({
    borderTopWidth: width,
    borderRightWidth: width,
    borderBottomWidth: width,
    borderLeftWidth: width,
  } as BorderStyle);

export const borderStyle = (borderProp?: BorderSetting, width = 0.5): ViewStyle => {
  if (!borderProp) {
    return defaultBorders(width);
  }
  const propToStyle = (b: Border) => {
    switch (b) {
      case 'top':
        return { borderTopWidth: width };
      case 'right':
        return { borderRightWidth: width };
      case 'bottom':
        return { borderBottomWidth: width };
      case 'left':
        return { borderLeftWidth: width };
    }
  };
  const emptyBorders = defaultBorders(0);
  const viewStyle = borderProp.reduce<BorderStyle>(
    (style, border) => ({ ...style, ...propToStyle(border) }),
    emptyBorders
  );
  return viewStyle;
};

export const flatten = <T extends ViewStyle | TextStyle>(...styles: StyleProp<T>[]) =>
  StyleSheet.flatten(styles);
