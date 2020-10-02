import React, { useState, useCallback } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button as RNEButton, ButtonProps as RNEButtonProps } from 'react-native-elements';

export type ButtonProps = RNEButtonProps & {
  bgColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  disabledStyle,
  onFocus,
  onBlur,
  bgColor,
  ...props
}) => {
  const [, setFocused] = useState(false);
  const _onFocus = useCallback(
    (e: Parameters<Exclude<RNEButtonProps['onFocus'], undefined>>[0]) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus]
  );
  const _onBlur = useCallback(
    (e: Parameters<Exclude<RNEButtonProps['onBlur'], undefined>>[0]) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur]
  );

  const color = bgColor ? { backgroundColor: bgColor } : {};
  return (
    <RNEButton
      {...props}
      onFocus={_onFocus}
      onBlur={_onBlur}
      buttonStyle={[styles.button, buttonStyle, color]}
      disabledStyle={[styles.button, styles.disabled, disabledStyle]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 22,
    // borderWidth: 2,
    paddingVertical: 0,
  } as ViewStyle,
  disabled: {
    opacity: 0.3,
  } as ViewStyle,
});
