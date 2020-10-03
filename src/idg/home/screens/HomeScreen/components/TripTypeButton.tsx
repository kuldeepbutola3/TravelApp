import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Touchable } from 'src/components/Touchable';
import { TripType } from 'src/constants/enums';

interface ITripTypeButton {
  title: TripType;
  selected: boolean;
  onPress(): void;
}

const TripTypeButton = ({ title, selected, onPress }: ITripTypeButton) => {
  return (
    <Touchable
      onPress={onPress}
      style={[styles.container, { backgroundColor: selected ? 'white' : 'transparent' }]}
    >
      <Text style={[styles.title, {color: selected ? '#4c669f' : 'white',}]}>{title}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 30,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 12,
    fontWeight:'400'
  },
});

export default TripTypeButton;
