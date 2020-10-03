import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const FlightClassDropdown = ({ data, value, onChangeText, containerStyle, label }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        selectedItemColor="black"
        baseColor="transparent"
        fontSize={20}
        textColor="white"
        data={data}
        value={value}
        onChangeText={onChangeText}
        containerStyle={styles.containerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#b2bec3',
    opacity: 0.9,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default FlightClassDropdown;
