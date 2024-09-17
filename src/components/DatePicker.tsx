import React, { useState, useCallback } from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StyleProp,
  SafeAreaView,
} from 'react-native';
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import { IOSPicker } from 'src/components/IOSPicker';
// import { TextInput, TextInputProps } from './TextInput';
import { Button } from './Button';

export type DatePickerProps = (IOSNativeProps | AndroidNativeProps) & {
  containerStyle?: StyleProp<ViewStyle>;
  onValueChange: (value: Date) => void;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    Platform.select({
      ios: <IOSDatePicker {...props} />,
      android: <AndroidDatePicker {...props} />,
    }) || <></>
  );
};

// export const TextInputNoTouch: React.FC<TextInputProps> = (props) => {
//   return <TextInput pointerEvents="none" editable={false} {...props} />;
// };

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
    [onChange]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.touchableContent}>
        {children}
      </TouchableOpacity>
      {showPicker && <DateTimePicker {...datePickerProps} onChange={_onChange} />}
    </View>
  );
};

const IOSDatePicker: React.FC<DatePickerProps> = ({
  children,
  containerStyle,
  onValueChange,
  value,
  ...datePickerProps
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [localDate, setLocalDate] = useState(value);
  const onPress = useCallback(() => setShowPicker(true), []);
  const onRequestClose = useCallback(() => setShowPicker(false), []);

  const _onChange = useCallback((_: Event, _value?: Date) => {
    _value && setLocalDate(_value);
  }, []);

  const onDonePress = useCallback(() => {
    onValueChange && onValueChange(localDate);
    setShowPicker(false);
  }, [localDate, onValueChange]);

  return (
    <IOSPicker
      touchableContent={children}
      style={containerStyle}
      showPicker={showPicker}
      onPress={onPress}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView>
        <View style={styles.iosPickerHeader}>
          <Button
            style={styles.iosPickerHeaderButton}
            // themeType="secondary"
            title="done"
            onPress={onDonePress}
          />
        </View>
        <DateTimePicker onChange={_onChange} {...datePickerProps} value={localDate} />
      </SafeAreaView>
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
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
  } as ViewStyle,
  iosPickerHeaderButton: {
    // alignSelf: 'flex-end',
  } as ViewStyle,
  touchableContent: {
    // flex: 1,
    // alignItems: 'center',
  } as ViewStyle,
  androidPicker: {
    position: 'absolute',
    top: 0,
    width: 1000,
    height: 1000,
    opacity: 0,
  } as ViewStyle,
});
