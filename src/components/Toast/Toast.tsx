import React, {useEffect, useCallback, useMemo, useRef} from 'react';
import {View, Dimensions, Animated, StyleSheet, ViewStyle} from 'react-native';
import {Button} from 'react-native-elements';
import {Text} from 'src/components/Text';
import {useAuraTranslation} from 'src/utils/i18n';

type ToastType = 'general' | 'undo';

export interface ToastModel {
  message: string;
  type?: ToastType;
}

type ToastProps = {
  currentToast: ToastModel;
  toastId: number;
  completion: () => void;
  undoTapped: () => Promise<undefined>;
};

let timerReference: number = 0;
export const Toast: React.FC<ToastProps> = ({
  currentToast,
  toastId,
  completion,
  undoTapped,
}) => {
  /**
   * Toast duration for 30 sec
   */
  const toastDuration = 30000;

  const animatedValue = useMemo(() => new Animated.Value(0), []);

  // const { currentToast, currentId } = useSliceSelector('toast');
  const isNewToast = toastId !== usePrevious(toastId) && toastId !== 0;

  const {t} = useAuraTranslation();

  function usePrevious(value: number) {
    const ref = useRef<number>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  /*
   * To Remove the timer which will dismiss the toast automatically.
   */
  const holdToast = useCallback(() => {
    clearTimeout(timerReference);
  }, []);

  const closeToast = useCallback(() => {
    /*
     * check if user hit close multiple times before close animation ends
     */
    if (timerReference === 0) {
      return;
    }
    timerReference = 0;

    const animatedComposition = Animated.timing(animatedValue, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    });
    animatedComposition.start(function () {
      completion();
    });
  }, [animatedValue, completion]);

  const showToast = useCallback(() => {
    Animated.timing(animatedValue, {toValue: 1, useNativeDriver: true});
    const animatedComposition = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    });
    animatedComposition.start(() => {
      const timerReferenc = setTimeout(() => {
        closeToast();
      }, toastDuration);
      //need to rectify
      // timerReference = timerReferenc;
    });
  }, [closeToast, toastDuration, animatedValue]);

  const typeUndo = currentToast?.type === 'undo';

  const crossTapped = useCallback(() => {
    holdToast();
    closeToast();
  }, [holdToast, closeToast]);

  const undoClicked = useCallback(async () => {
    await undoTapped();
    holdToast();
    closeToast();
  }, [undoTapped, holdToast, closeToast]);

  useEffect(() => {
    if (isNewToast) {
      showToast();
    }
  }, [isNewToast, showToast]);

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.2, 0.9, 1],
              }),
            },
          ],
        },
      ]}>
      <View
        style={[
          styles.container,
          {backgroundColor: typeUndo ? 'green' : 'red'},
        ]}>
        <Text style={styles.textStyle}>{currentToast?.message}</Text>

        <View>
          {typeUndo ? (
            <Button title={t('undo')} onPress={undoClicked} />
          ) : (
            <Button
              icon={{name: 'close', color: 'white'}}
              onPress={crossTapped}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: Dimensions.get('screen').width - 40,
    bottom: 50,
    alignSelf: 'center',
  } as ViewStyle,
  container: {
    borderRadius: 5,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  textStyle: {
    flexShrink: 1,
    marginHorizontal: 10,
    marginRight: 30,
  } as ViewStyle,
});
