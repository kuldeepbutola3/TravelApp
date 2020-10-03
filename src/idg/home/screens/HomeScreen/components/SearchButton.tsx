import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { Touchable } from 'src/components/Touchable';

interface ISearchButton {
  title: string;
  containerStyle: ViewStyle;
  onPress(): void;
}

const SearchButton = ({ title, containerStyle, onPress }: ISearchButton) => {
  return (
    <Touchable onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{title}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SearchButton;
