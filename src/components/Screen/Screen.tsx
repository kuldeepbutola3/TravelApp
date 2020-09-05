import React, {ReactNode, FC} from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StatusBar,
  ViewProps,
  StatusBarProps,
} from 'react-native';

interface ScreenProps extends ViewProps {
  /** the content to render within the screen */
  children?: ReactNode;
  statusBarProps?: StatusBarProps;
}

export const Screen: FC<ScreenProps> = (props) => {
  const {children, statusBarProps} = props;

  return (
    <View {...props} style={[styles.container, props.style]}>
      <StatusBar {...statusBarProps} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
});
