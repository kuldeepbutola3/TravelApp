import React, { FC, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';

export interface TabButtonProps {
  id: number;
  iconName: string;
  title: string;
  onPress?: (key: number) => void;
}

export const TabButtons: FC<TabButtonProps> = ({ id, iconName, onPress, title }) => {
  const tap = useCallback(() => onPress && onPress(id), [onPress, id]);

  return (
    <TouchableOpacity onPress={tap} style={styles.tabBarTouch}>
      <Icon name={iconName} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBarTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
