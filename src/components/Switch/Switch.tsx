import React, { FC, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  ViewProps,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import { useAuraTranslation } from 'src/utils/i18n';
import { Text } from '../Text';

interface SwitchProps extends ViewProps {
  onValueChange: (value: boolean) => void;
  value: boolean;
}

export const Switch: FC<SwitchProps> = ({ value, onValueChange }) => {
  const { t } = useAuraTranslation();

  const left = useRef(new Animated.Value(2)).current;
  useEffect(() => {
    Animated.timing(left, {
      toValue: value ? SWITCH_WIDTH - KNOB_SIZE - 2 : 2,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [value, left]);

  // const containerStyle = value
  //   ? theme.viewStyles.toggleOn
  //   : theme.viewStyles.toggleOff;

  const labelPosition = value ? { paddingRight: KNOB_SIZE + 2 } : { paddingLeft: KNOB_SIZE + 2 };
  const label = value ? t('on') : t('off');

  const onPressOut = useCallback(() => onValueChange && onValueChange(!value), [
    onValueChange,
    value,
  ]);

  return (
    <TouchableWithoutFeedback onPressOut={onPressOut}>
      <View style={[styles.container]}>
        <View style={[styles.labelContainer, labelPosition]}>
          <Text>{label}</Text>
        </View>
        <Animated.View style={[styles.knob, { left }]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const SWITCH_WIDTH = 70;
const SWITCH_HEIGHT = 24;
const KNOB_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
  } as ViewStyle,
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: 2,
  } as ViewStyle,
});
