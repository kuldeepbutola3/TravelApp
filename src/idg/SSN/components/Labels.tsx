import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from 'src/styles/appColors';

export const InfoLabel = ({ color, label }) => {
  return (
    <View style={styles.infoLabelContainer}>
      <View style={[styles.indicatorBox, { backgroundColor: color }]} />
      <Text>{label}</Text>
    </View>
  );
};

export const SeatInfoLabel = () => {
  return (
    <View style={styles.seatInfoContainer}>
      <Text style={{ marginVertical: 5, color: appColors.pink }}>
        Tap and Select Premium Seats of your choice
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '700', color: appColors.pink }}>FRONT SIDE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  indicatorBox: {
    height: 15,
    width: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 5,
  },
  seatInfoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
});
