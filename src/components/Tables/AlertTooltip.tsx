import React, {useState, useRef, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import Popover from 'react-native-popover-view';
import {Icon} from 'react-native-elements';
import {fonts} from 'src/styles';

type AlertTooltipProps = {
  text: string;
};

export const AlertTooltip: React.FC<AlertTooltipProps> = ({text}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const alertRef = useRef<View | null>(null);

  const show = useCallback(() => setIsPopoverVisible(true), []);
  const hide = useCallback(() => setIsPopoverVisible(false), []);

  return (
    <>
      <View
        ref={alertRef}
        renderToHardwareTextureAndroid={true}
        collapsable={false}>
        <Icon
          onPress={show}
          type="aura-icons"
          name="alert"
          color="#de6422" // TODO: set this color via theming
          size={18}
        />
      </View>
      <Popover
        popoverStyle={styles.popoverContainer}
        backgroundStyle={styles.overlay}
        arrowStyle={styles.arrow}
        isVisible={isPopoverVisible}
        from={alertRef.current}
        verticalOffset={Platform.select({
          android: -(StatusBar.currentHeight ? StatusBar.currentHeight : 0),
        })}
        onRequestClose={hide}>
        <Text style={styles.popoverText}>{text}</Text>
      </Popover>
    </>
  );
};

const styles = StyleSheet.create({
  popoverContainer: {
    backgroundColor: '#4a4a4a',
    borderRadius: 10,
    width: 225,
  } as ViewStyle,
  arrow: {} as ViewStyle,
  popoverText: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    fontFamily: fonts.SFProText.regular,
    fontSize: 21,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
  } as TextStyle,
  overlay: {
    backgroundColor: undefined,
  },
});
