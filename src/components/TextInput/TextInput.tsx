import React, {FC, useState, useCallback} from 'react';
import {Input, InputProps} from 'react-native-elements';

import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  View,
  TextInput as RNTextInput,
} from 'react-native';
import {
  DropdownPickerProps,
  DropdownPicker,
  PickerItem,
} from 'src/components/DropdownPicker';

export type TextInputProps = InputProps & {
  translucent?: boolean;
  dropdownItems?: DropdownPickerProps['items'];
};

export const TextInput: FC<TextInputProps> = ({
  translucent,
  containerStyle,
  inputStyle,
  labelStyle,
  onFocus,
  onBlur,
  dropdownItems,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);
  type FocusEvent = Parameters<
    Exclude<TextInputProps['onFocus'], undefined>
  >[0];
  const _onFocus = useCallback(
    (e: FocusEvent) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );
  type BlurEvent = Parameters<Exclude<TextInputProps['onBlur'], undefined>>[0];
  const _onBlur = useCallback(
    (e: BlurEvent) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const focusedStyle = focused ? styles.focused : {};
  const _containerStyle = StyleSheet.flatten([
    styles.container,

    focusedStyle,
    containerStyle,
  ]);

  //#region Dropdown specific code
  const firstItem = dropdownItems?.find(Boolean);
  const [selectedItem, setSelectedItem] = useState(firstItem);
  const {onChangeText} = inputProps;
  const onValueChange = useCallback(
    (item: PickerItem) => {
      onChangeText && onChangeText(item?.value);
      setSelectedItem(item);
    },
    [onChangeText],
  );
  const dropdownInputProps = dropdownItems && {
    inputComponent: CustomInputComponent,
    // rightIcon: (
    //   <ThemedIcon
    //     themeStyle="navigationTabBarIconsDefault"
    //     name="twisty-open"
    //   />
    // ),
    rightIconContainerStyle: styles.rightIcon,
  };
  //#endregion

  const ChildInput = (
    <Input
      {...inputProps}
      {...dropdownInputProps}
      labelStyle={[labelStyle]}
      inputStyle={[styles.input, inputStyle]}
      onFocus={_onFocus}
      onBlur={_onBlur}
    />
  );

  return dropdownItems ? (
    <DropdownPicker
      style={_containerStyle}
      selectedItem={selectedItem}
      onValueChange={onValueChange}
      items={dropdownItems}>
      {ChildInput}
    </DropdownPicker>
  ) : (
    <View style={_containerStyle}>{ChildInput}</View>
  );
};

// Custom component for when the dropdown option is chosen.
// These default props will ensure the React Native
// TextInput component doesn't intercept the dropdown touches
class CustomInputComponent extends RNTextInput {
  public static defaultProps = {
    editable: false,
    pointerEvents: 'none',
  };
}

// const viewStyleForState = (
//   translucent: TextInputProps['translucent'],
//   disabled: TextInputProps['disabled'],
// ): keyof AuraTheme['viewStyles'] => {
//   switch (true) {
//     case disabled:
//       return 'fieldDisabled';
//     case translucent:
//       return 'fieldTranslucentDefault';
//     default:
//       return 'fieldDefault';
//   }
// };

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  } as ViewStyle,
  inputContainer: {
    borderBottomWidth: 0,
    marginVertical: Platform.select({ios: 4, android: 0}), // Android is weird
  } as ViewStyle,
  input: {
    minHeight: 24,
    paddingVertical: 0, // more Android hacking
  } as TextStyle,
  focused: {
    // iOS
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    // Android
    elevation: 16,
  } as ViewStyle,
  rightIcon: {
    height: undefined,
  } as ViewStyle,
});
