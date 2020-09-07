import React, { useState, useCallback } from 'react';
import { View, ViewStyle, StyleSheet, Platform, Picker, PickerIOS, StyleProp } from 'react-native';
import { IOSPicker } from '../IOSPicker';

export type PickerItem = {
  // `value` must be the unique "id" of the element selected
  value: string;
  // Default is `value`
  label?: string;
};

export type DropdownPickerProps<Item extends PickerItem = PickerItem> = {
  // The container's style
  style?: StyleProp<ViewStyle>;
  // The child element will be shown inside, at all times like a button (not the picker element)
  children: React.ReactNode;
  selectedItem?: Item;
  items: Item[];
  // Whether you want the picker to close itself after making a selection.
  // Closing itself is default (return void). Return `true if you want it to stay open.
  // iOS only, Android closes all the time automatically
  onValueChange?: (item: Item, index: number) => void | true;
};

/**
 * DropDownPicker will bring up a "stylesheet" picker for iOS and a modal picker
 * for Android. Unfortunately there are various issues with the open source packages online
 * so we had to roll our own.
 * The following implementation could be improved. On one hand there is duplication of code
 * which is leading to brittle inconsistencies. But on the other hand, trying to share the
 * random resuable parts would make this component quite confusing.
 */
export const DropdownPicker = <Item extends PickerItem>(props: DropdownPickerProps<Item>) => {
  return (
    Platform.select({
      ios: <IOSDropdownPicker<Item> {...props} />,
      android: <AndroidPicker<Item> {...props} />,
    }) || <></>
  );
};

const AndroidPicker = <Item extends PickerItem>(props: DropdownPickerProps<Item>) => {
  const { onValueChange, items, children, selectedItem, style } = props;

  const _onValueChanged = useCallback(
    (value: React.ReactText) => {
      const index = items.findIndex((item) => item.value === value);
      const item = items[index];
      onValueChange && onValueChange(item, index);
    },
    [items, onValueChange]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.touchableContent}>{children}</View>
      <Picker
        style={[styles.androidPicker]}
        selectedValue={selectedItem?.value}
        onValueChange={_onValueChanged}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label || item.value} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const IOSDropdownPicker = <Item extends PickerItem>(props: DropdownPickerProps<Item>) => {
  const { onValueChange, items, selectedItem, style, children } = props;
  const [showPicker, setShowPicker] = useState(false);
  const onDropDownPress = useCallback(() => setShowPicker(true), []);
  const onRequestClose = useCallback(() => setShowPicker(false), []);

  const _onValueChanged = useCallback(
    (value: React.ReactText) => {
      const index = items.findIndex((item) => item.value === value);
      const item = items[index];
      const keepOpen = onValueChange && onValueChange(item, index);
      setShowPicker(!!keepOpen);
    },
    [items, onValueChange]
  );

  return (
    <IOSPicker
      touchableContent={children}
      style={style}
      showPicker={showPicker}
      onPress={onDropDownPress}
      onRequestClose={onRequestClose}
    >
      <PickerIOS selectedValue={selectedItem?.value} onValueChange={_onValueChanged}>
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label || item.value} value={item.value} />
        ))}
      </PickerIOS>
    </IOSPicker>
  );
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
