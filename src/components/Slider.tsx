import React, { useCallback, useRef, useLayoutEffect, MutableRefObject } from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Animated,
  ViewProps,
  TextStyle,
  StyleProp,
  TextInput,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerProperties,
  State,
} from 'react-native-gesture-handler';

export type KnobValues = [number, number | undefined];
export type OnValueChange = (value: number) => void;
export type OnValuesChange = (values: KnobValues) => void;
export type OnSlidingStateChange = (sliding: boolean, values: KnobValues) => void;
export type SliderRef = {
  setValues: (values: KnobValues) => void;
};
export type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  // If not concerned with two knobs, you can use this convenience default value
  defaultValue?: number;
  // To show two knobs, set two numbers for the defaultValues prop
  defaultValues?: KnobValues;
  onValuesChange?: OnValuesChange;
  // If not concerned with two knobs, you can use this convenience callback
  onValueChange?: OnValueChange;
  // Use this if you want to be notified when touch events start/stop.
  // You can also use this instead of continuous value updates
  onSlidingStateChange?: OnSlidingStateChange;
  sliderRef?: MutableRefObject<SliderRef | undefined>;
};

const CONTAINER_HEIGHT = 40;
const THUMB_SIZE = 28;

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step,
  defaultValue = 0,
  defaultValues = [defaultValue, undefined],
  onValuesChange,
  onValueChange,
  onSlidingStateChange,
  sliderRef,
}) => {
  let _min = min;
  let _max = max;
  const givenRange = _max - _min;
  let _step = step || 0.1 * givenRange;
  if (_step > givenRange / 2) {
    _step = givenRange / 2;
  }
  if (_max <= _min) {
    console.log('check parameters. Your max is larger than min in component Slider');
    _min = 0;
    _max = 100;
    _step = 10;
  }
  const knobRef1 = useRef<KnobRef>();
  const knobRef2 = useRef<KnobRef>();

  const localValues = useRef(defaultValues);
  const animatedTrackLeft = useRef(new Animated.Value(0.0)).current;
  const animatedTrackRight = useRef(new Animated.Value(0.0)).current;

  const width = useRef(0);
  const draggingKnob = useRef<KnobRef>();

  const onHandlerState = useCallback(
    (e: Parameters<Exclude<PanGestureHandlerProperties['onHandlerStateChange'], undefined>>[0]) => {
      if (e.nativeEvent.state === State.BEGAN) {
        const x = e.nativeEvent.x - e.nativeEvent.translationX;
        const y = e.nativeEvent.y;
        const notify = () =>
          onSlidingStateChange && onSlidingStateChange(true, localValues.current);
        if (knobRef2.current?.isHit(x, y)) {
          draggingKnob.current = knobRef2.current;
          notify();
          return;
        }
        if (knobRef1.current?.isHit(x, y)) {
          draggingKnob.current = knobRef1.current;
          notify();
          return;
        }
      }
      if (
        (draggingKnob.current && e.nativeEvent.state === State.END) ||
        e.nativeEvent.state === State.CANCELLED ||
        e.nativeEvent.state === State.FAILED
      ) {
        draggingKnob.current = undefined;
        onSlidingStateChange && onSlidingStateChange(false, localValues.current);
      }
    },
    [onSlidingStateChange]
  );

  const thumbSize = THUMB_SIZE;
  const minX = 0;

  const getValues = useCallback(
    (knob?: KnobRef) => {
      if (!knob) {
        return undefined;
      }
      const percentage = width.current ? knob.currentX / (width.current - thumbSize) : 0;
      const range = _max - _min;
      const rawUserValue = _min + percentage * range;
      const roundedUserValue = Math.ceil((rawUserValue - _min) / _step) * _step + _min;

      return {
        urserValue: roundedUserValue,
        percentage,
      };
    },
    [_max, _min, _step, thumbSize]
  );

  const calculateTrackLocation = useCallback(() => {
    const knob1X = knobRef1.current?.currentX || 0;
    const knob2X = knobRef2.current?.currentX;
    if (knob2X === undefined) {
      animatedTrackLeft.setValue(knob1X);
      return;
    }
    animatedTrackLeft.setValue(Math.min(knob1X, knob2X));
    animatedTrackRight.setValue(width.current - Math.max(knob1X, knob2X));
  }, [animatedTrackLeft, animatedTrackRight]);

  const updateValues = useCallback(() => {
    const knob1Values = getValues(knobRef1.current);
    const knob2Values = getValues(knobRef2.current);

    const firstValue = knob1Values?.urserValue || 0;
    const secondValue = knob2Values?.urserValue;
    let newValues: KnobValues = [firstValue, secondValue];
    if (secondValue !== undefined && firstValue > secondValue) {
      newValues = [secondValue, firstValue];
    }
    if (newValues[0] !== localValues.current[0] || newValues[1] !== localValues.current[1]) {
      localValues.current = newValues;
      onValuesChange && onValuesChange(newValues);
      onValueChange && onValueChange(newValues[0]);
    }
  }, [getValues, onValuesChange, onValueChange]);

  const moveTo = useCallback(
    (desiredX: number, knob?: KnobRef) => {
      if (!knob) {
        return;
      }

      const maxX = width.current - thumbSize;
      let newX = desiredX;
      if (desiredX < minX) {
        newX = minX;
      } else if (desiredX > maxX) {
        newX = maxX;
      }

      knob.moveTo(newX);
    },
    [thumbSize]
  );

  const setUserValue = useCallback(
    (value?: number, knob?: KnobRef) => {
      if (value === undefined || !knob || value < _min || value > _max) {
        return;
      }
      const range = _max - _min;
      const desiredX = ((value - _min) / range) * width.current - thumbSize;
      moveTo(desiredX, knob);
    },
    [_max, _min, moveTo, thumbSize]
  );

  const setUserValues = useCallback(
    (userValues: KnobValues) => {
      setUserValue(userValues[0], knobRef1.current);
      setUserValue(userValues[1], knobRef2.current);
      updateValues();
      calculateTrackLocation();
    },
    [calculateTrackLocation, setUserValue, updateValues]
  );

  useLayoutEffect(() => {
    if (sliderRef) {
      const refValue: SliderRef = {
        setValues: setUserValues,
      };
      sliderRef.current = refValue;
    }
  }, [setUserValues, sliderRef]);

  const onPan = useCallback(
    (e: Parameters<Exclude<PanGestureHandlerProperties['onGestureEvent'], undefined>>[0]) => {
      const desiredX = e.nativeEvent.x - thumbSize / 2;
      moveTo(desiredX, draggingKnob.current);
      updateValues();
      calculateTrackLocation();
    },
    [calculateTrackLocation, moveTo, thumbSize, updateValues]
  );

  const onLayout: ViewProps['onLayout'] = useCallback(
    (e) => {
      width.current = e.nativeEvent.layout.width;
      setUserValues(localValues.current);
    },
    [setUserValues]
  );

  return (
    <PanGestureHandler minDist={0} onGestureEvent={onPan} onHandlerStateChange={onHandlerState}>
      <Animated.View style={styles.container}>
        <View onLayout={onLayout} style={[styles.baseTrack, { backgroundColor: 'red' }]} />
        <Animated.View
          style={[
            styles.activeTrack,
            { backgroundColor: 'blue' },
            {
              left: animatedTrackLeft,
              right: animatedTrackRight,
            },
          ]}
        />
        <Knob knobRef={knobRef1} />
        {defaultValues[1] !== undefined ? <Knob knobRef={knobRef2} /> : null}
      </Animated.View>
    </PanGestureHandler>
  );
};

type KnobRef = {
  currentX: number;
  animatedX: Animated.Value;
  isHit: (touchX: number, touchY: number) => boolean;
  moveTo: (x: number) => void;
};

type KnobProps = {
  initialX?: number;
  knobRef: MutableRefObject<KnobRef | undefined>;
};
const Knob = ({ knobRef, initialX = 0 }: KnobProps) => {
  const animatedX = useRef(new Animated.Value(initialX)).current;

  const isHit = useCallback((touchX: number, touchY: number) => {
    const viewX = _ref.current.currentX;
    const thumbSize = THUMB_SIZE;
    const containerHeight = CONTAINER_HEIGHT;
    const margin = 10;
    const xMin = viewX - margin;
    const xMax = viewX + thumbSize + margin;
    const viewY = (containerHeight - thumbSize) / 2;
    const yMin = viewY - margin;
    const yMax = containerHeight - viewY + margin;
    return touchX > xMin && touchX < xMax && touchY > yMin && touchY < yMax;
  }, []);

  const moveTo = useCallback(
    (x: number) => {
      _ref.current.currentX = x;
      animatedX.setValue(x);
    },
    [animatedX]
  );

  const initialRef: KnobRef = { currentX: initialX, animatedX, isHit, moveTo };
  const _ref = useRef(initialRef);
  useLayoutEffect(() => {
    knobRef.current = _ref.current;
  }, [_ref, knobRef]);

  return (
    <Animated.View
      style={[
        styles.thumb,
        { backgroundColor: 'green' },
        {
          borderColor: 'orange',
          left: animatedX,
        },
      ]}
    />
  );
};

export type FastTextRef = {
  setText: (text: string) => void;
};
export type FastTextProps = {
  style?: StyleProp<TextStyle>;
  defaultValue?: string;
  textRef: MutableRefObject<FastTextRef | undefined>;
};

export const FastText: React.FC<FastTextProps> = ({ style, defaultValue, textRef }) => {
  const _style = style; // [textStyles.P2, theme.textStyles.paragraphPrimary, style];
  const setRef = useCallback(
    (instance: TextInput) => {
      const setText = (text: string) =>
        instance?.setNativeProps && instance.setNativeProps({ text });
      textRef.current = { setText };
      defaultValue && setText(defaultValue);
    },
    [textRef, defaultValue]
  );

  return <TextInput ref={setRef} style={_style} editable={false} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: CONTAINER_HEIGHT,
    flex: 1,
  } as ViewStyle,
  baseTrack: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'gray',
  },
  activeTrack: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  thumb: {
    borderWidth: 4,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: 'white',
    position: 'absolute',
  } as ViewStyle,
});
