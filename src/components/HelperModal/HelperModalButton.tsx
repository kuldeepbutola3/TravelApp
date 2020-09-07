import React, { useState, useCallback } from 'react';
import { ViewStyle, StyleSheet, TouchableWithoutFeedback, View, StyleProp } from 'react-native';
import { Icon as ThemedIcon } from 'react-native-elements';
import { HelperModal, HelperModalProps } from './HelperModal';

type HelperModalButtonProps = {
  /**
   * Pass either a custom component, or nothing at all.
   * Default is a question mark icon button.
   */
  children?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  modalIcon: HelperModalProps['icon'];
  modalHeadline?: HelperModalProps['headline'];
  modalMessage?: HelperModalProps['message'];
  /**
   * onDismiss will always be called. By default, the main
   * action button's onPress will be called, then onDismiss
   * immediately after.
   */
  onDismiss?: HelperModalProps['onDismiss'];
  /**
   * By default, the main action button will dismiss
   * the modal after executing this callback. Return
   * true if you want the modal to continue to stay open.
   */
  mainActionProps?: HelperModalProps['mainActionProps'];
};

export const HelperModalButton: React.FC<HelperModalButtonProps> = ({
  children,
  style,
  modalIcon,
  modalHeadline,
  modalMessage,
  onDismiss,
  mainActionProps,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const _onMainPress = () => {
    const shouldStayOpen = mainActionProps?.onPress && mainActionProps?.onPress();
    if (shouldStayOpen) {
      return;
    }
    setIsVisible(false);
  };

  const onPress = useCallback(() => setIsVisible(true), []);

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>{children || <ThemedIcon name="question" />}</View>
      </TouchableWithoutFeedback>
      <HelperModal
        isVisible={isVisible}
        icon={modalIcon}
        headline={modalHeadline}
        message={modalMessage}
        onDismiss={onDismiss}
        mainActionProps={{ ...mainActionProps, onPress: _onMainPress }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
});
