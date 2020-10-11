import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { FastText, FastTextRef, OnValueChange, Slider, SliderProps } from 'src/components/Slider';

type FilterSliderProps = {
  title: string;
  icon?: string;
  defaultValue: number;
  onValueChange: (value: number) => void;
  minValue: number;
  maxValue: number;
};

const THRESHOLD_MIN = 0;
const THRESHOLD_MAX = 400;

export const FilterSlider: React.FC<FilterSliderProps> = ({
  title,
  defaultValue = 0,
  onValueChange,
  minValue = 0,
  maxValue = 0,
}) => {
  const minText = minValue.toString();
  const maxText = maxValue.toString();
  const _defaultValue = defaultValue / 100;
  const [normalizedValue, setNormalizedValue] = useState(_defaultValue);

  const onStateChanged = useCallback<Exclude<SliderProps['onSlidingStateChange'], undefined>>(
    (sliding, [value]) => {
      if (sliding) {
        return;
      }
      setNormalizedValue(value);
      onValueChange && onValueChange(value * 100);
    },
    [onValueChange]
  );

  const textRef = useRef<FastTextRef>();

  const _onValueChange = useCallback<OnValueChange>((newValue) => {
    textRef.current?.setText(newValue.toString());
  }, []);

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTitleContainer}>
        {/* <ThemedIcon themeStyle="titlesPrimary" name={icon} /> */}
        <Text style={styles.sliderTitle}>{title}</Text>
        <FastText defaultValue={normalizedValue.toString()} textRef={textRef} />
      </View>
      <Slider
        onValueChange={_onValueChange}
        defaultValue={_defaultValue}
        onSlidingStateChange={onStateChanged}
        min={THRESHOLD_MIN}
        max={THRESHOLD_MAX}
        step={25}
      />
      <View style={styles.sliderFooterContainer}>
        <Text style={styles.sliderMinLabel}>{minText}</Text>
        <View style={styles.sliderSpacerLabel} />
        <Text style={styles.sliderMaxLabel}>{maxText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {} as ViewStyle,
  sliderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  sliderTitle: {
    marginHorizontal: 16,
    flex: 1,
  } as TextStyle,
  sliderFooterContainer: {
    flexDirection: 'row',
  } as ViewStyle,
  sliderMinLabel: {} as TextStyle,
  sliderSpacerLabel: {
    flex: 1,
  } as ViewStyle,
  sliderMaxLabel: {
    flexDirection: 'row',
  } as TextStyle,
});
