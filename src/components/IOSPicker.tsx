import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StyleProp,
  TouchableWithoutFeedback,
} from 'react-native';

export type IOSPickerProps = {
  touchableContent: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showPicker: boolean;
  onPress: () => void;
  onRequestClose: () => void;
};

export const IOSPicker: React.FC<IOSPickerProps> = ({
  touchableContent,
  children,
  onPress,
  onRequestClose,
  style,
  showPicker,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.touchableContent}>{touchableContent}</View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={showPicker}
        onRequestClose={onRequestClose}>
        <View style={[styles.modal]}>
          <TouchableWithoutFeedback onPress={onRequestClose}>
            <View style={[styles.modalSpacer]} />
          </TouchableWithoutFeedback>
          <View style={[styles.picker]}>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  touchableContent: {
    alignItems: 'center',
  } as ViewStyle,
  modal: {
    flex: 1,
    backgroundColor: '#00000080',
  } as ViewStyle,
  modalSpacer: {
    flex: 1,
  },
  picker: {
    backgroundColor: 'white',
  } as ViewStyle,
});
