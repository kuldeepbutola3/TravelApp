import React from 'react';
import { ViewStyle, StyleSheet, View, ScrollView } from 'react-native';

import { Icon as ThemedIcon } from 'react-native-elements';
import { Text } from 'src/components/Text';
import { Button } from 'react-native-elements';

import { Overlay, OverlayProps } from './Overlay';

export type HelperModalProps = {
  isVisible: OverlayProps['isVisible'];
  /** Either a custom icon or a ThemedIcon aura-icons name */
  icon: React.ReactElement | string;
  headline?: string;
  message?: string;
  onDismiss?: OverlayProps['onDismiss'];
  mainActionProps?: {
    onPress?: () => true | void;
    /** Default title is "OKAY" */
    title?: string;
  };
};

export const HelperModal: React.FC<HelperModalProps> = ({
  isVisible,
  icon,
  message,
  headline,
  onDismiss,
  mainActionProps,
}) => {
  // const theme = useTheme();
  // const {t} = useAuraTranslation();

  // const screen = Dimensions.get('window');
  // const insets = useSafeAreaInsets();

  return (
    <Overlay
      isVisible={isVisible}
      // overlayBackgroundColor={theme.viewStyles.modal.backgroundColor}
      // windowBackgroundColor="rgba(62, 59, 87, 0.8)"
      // containerStyle={styles.container}
      overlayStyle={styles.overlay}
      // width={screen.width - 36 * 2}
      // height={screen.height - (insets.top + 36 * 2)}
      onDismiss={onDismiss}
    >
      <View style={styles.content}>
        {typeof icon === 'string' ? <ThemedIcon name={icon} /> : icon}
        <Text>{headline}</Text>
        <ScrollView style={styles.scrollView} alwaysBounceVertical={false}>
          <Text>{message}</Text>
        </ScrollView>
        <Button
          onPress={mainActionProps?.onPress}
          buttonStyle={styles.button}
          title={mainActionProps?.title ?? ''}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  overlay: {
    paddingHorizontal: 35,
    paddingTop: 18,
    paddingBottom: 30,
  } as ViewStyle,
  scrollView: {
    flex: 1,
    marginTop: 16,
  } as ViewStyle,
  content: {
    flex: 1,
  } as ViewStyle,
  paragraphs: {
    flex: 1,
  } as ViewStyle,
  button: {
    marginTop: 10,
  } as ViewStyle,
});
