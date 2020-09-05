import React from 'react';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {IconProps, Icon as ThemedIcon} from 'react-native-elements';

import {Touchable} from 'src/components/Touchable';
import {Text} from 'src/components/Text';

type DrawerNavItemProps = {
  iconName: IconProps['name'];
  navItemTitle: string;
  onPressProp: () => void;
};

export const DrawerNavItem: React.FC<DrawerNavItemProps> = ({
  iconName,
  onPressProp,
  navItemTitle,
}) => {
  return (
    <Touchable style={[styles.buttonContainer]} onPress={onPressProp}>
      <ThemedIcon name={iconName} />
      <Text style={styles.itemLabel}>{navItemTitle}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  iconContainer: {
    justifyContent: 'center',
  } as ViewStyle,
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  itemLabel: {
    paddingLeft: 10,
  } as TextStyle,
});
