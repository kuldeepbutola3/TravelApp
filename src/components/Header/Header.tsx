import React, { ReactNode, FC } from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import { Button } from 'react-native-elements';
import { appColors } from 'src/styles/appColors';
import { Text } from '../Text';

export interface HeaderProps extends ViewProps {
  children?: ReactNode;
  onPressBack?: () => void;
  title?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  const { children, onPressBack, title } = props;

  return (
    <View {...props} style={[styles.container, props.style]}>
      <View style={styles.innerContainer}>
        {onPressBack && (
          <Button
            icon={{
              name: 'arrow-back', //'keyboard-backspace',
              color: 'white',
            }}
            type="clear"
            onPress={onPressBack}
          />
        )}
        <View style={styles.child}>
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.pink,
    paddingVertical: 10,
  } as ViewStyle,
  innerContainer: { flexDirection: 'row' } as ViewStyle,
  child: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 18, color: 'white' },
});
