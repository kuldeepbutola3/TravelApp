import React, {FC} from 'react';

import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';

interface FABProps {
  label: string;
  onPressProp?: () => void;
}

export const FAB: FC<FABProps> = ({label, onPressProp}) => {
  return (
    <TouchableOpacity onPress={onPressProp} style={styles.touchable}>
      <Icon name={label} type={'font-awesome'} size={32} color={'white'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 56,
    backgroundColor: 'red',
    borderRadius: 100,
  } as ViewStyle,
});
