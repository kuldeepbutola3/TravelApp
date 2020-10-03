import React, {useState, useCallback} from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
  Event
} from '@react-native-community/datetimepicker';
import {IOSPicker} from 'src/components/IOSPicker';

export type DatePickerProps = (IOSNativeProps | AndroidNativeProps) & {
  containerStyle?: StyleProp<ViewStyle>;
  // Whether you want the picker to close itself after making a selection.
  // Closing itself is default (return void). Return `true if you want it to stay open.
  // iOS only, Android closes all the time automatically
  onValueChange: (event: Event, value: Date) => void | true;
  onRequestClose: () => void
  showPicker: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    Platform.select({
      ios: <IOSDatePicker {...props} />,
      android: <AndroidDatePicker {...props} />,
    }) || <></>
  );
};

const AndroidDatePicker: React.FC<DatePickerProps> = ({
  containerStyle,
  onValueChange: onChange,
  children,
  ...datePickerProps
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const onPress = useCallback(() => setShowPicker(true), []);

  const _onChange = useCallback(
    (_: Event, value?: Date) => {
      setShowPicker(false);
      value && onChange && onChange(value);
    },
    [onChange],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.touchableContent}>
        {children}
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker {...datePickerProps} onChange={_onChange} />
      )}
    </View>
  );
};

const IOSDatePicker: React.FC<DatePickerProps> = ({
  children,
  containerStyle,
  onValueChange,
  showPicker,
  onRequestClose,
  ...datePickerProps
}) => {
//   const onPress = useCallback(() => setShowPicker(true), []);
//   const onRequestClose = useCallback(() => setShowPicker(false), []);

//   const _onChange = useCallback(
//     (_: Event, value?: Date) => {
//       const keepOpen = value && onChange && onChange(value);
//       setShowPicker(!!keepOpen);
//     },
//     [onChange],
//   );

  return (
    <IOSPicker
      touchableContent={children}
      style={containerStyle}
      showPicker={showPicker}
    //   onPress={onPress}
      onRequestClose={onRequestClose}>
      <DateTimePicker {...datePickerProps} onChange={onValueChange} />
    </IOSPicker>
  );
};

type IOSPickerProps = {
  touchableContent: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showPicker: boolean;
  onPress: () => void;
  onRequestClose: () => void;
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  touchableContent: {
    alignItems: 'center',
  } as ViewStyle,
  androidPicker: {
    position: 'absolute',
    top: 0,
    width: 1000,
    height: 1000,
    opacity: 0,
  } as ViewStyle,
});
export function a() {}
