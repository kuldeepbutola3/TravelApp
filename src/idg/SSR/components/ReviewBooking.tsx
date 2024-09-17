import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from 'src/styles/appColors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Touchable } from 'src/components/Touchable';

const Seperator = () => <View style={styles.seperator} />;

const ReviewBooking = ({ onClose, selectedSeats, selectedMeals, mealCount, selectedBaggages, baggageCount, seatCount, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Review Add-ons</Text>
        <Icon name="close" size={30} onPress={onClose} />
      </View>

      <View style={styles.rowContainer}>
        <Icon name="car-seat" size={40} color={appColors.pink} />
        <Text style={{ fontSize: 22 }}>{selectedSeats}</Text>
        <Text style={{ fontSize: 22 }}>{seatCount}</Text>
      </View>

      <Seperator />

      <View style={styles.rowContainer}>
        <Icon name="food" size={40} color={appColors.pink} />
        <Text style={{ fontSize: 22 }}>{selectedMeals}</Text>
        <Text style={{ fontSize: 22 }}>{mealCount}</Text>
      </View>

      <Seperator />

      <View style={styles.rowContainer}>
        <Icon name="bag-carry-on" size={40} color={appColors.pink} />
        <Text style={{ fontSize: 22 }}>{selectedBaggages}</Text>
        <Text style={{ fontSize: 22 }}>{baggageCount}</Text>
      </View>

      <Seperator />

      <Touchable style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonLabel}>CONTINUE ANYWAY</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  seperator: {
    height: 0,
    borderWidth: 0.5,
    borderColor: appColors.lightGrey,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: appColors.pink,
    width: '70%',
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonLabel: {
    color: appColors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default ReviewBooking;
