import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Touchable } from 'src/components/Touchable';
import { appColors } from 'src/styles/appColors';

export const RectButton = ({ isSelected, label, onPress }) => {
  return (
    <Touchable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? appColors.pink : '#EAEAEA',
        },
      ]}
    >
      <Text style={[styles.label, { color: isSelected ? appColors.white : appColors.black }]}>
        {label}
      </Text>
    </Touchable>
  );
};

export const AddSubtractButton = ({ onPressSubtract, onPressAdd, total }) => {
  return (
    <View style={styles.addSubtractContainer}>
      <Touchable style={styles.addContainer} onPress={onPressSubtract}>
        <Text style={styles.addSubtractLabel}>-</Text>
      </Touchable>

      <View style={styles.totalContainer}>
        <Text style={styles.addLabel}>{total}</Text>
      </View>

      <Touchable style={styles.subtractContainer} onPress={onPressAdd}>
        <Text style={styles.addSubtractLabel}>+</Text>
      </Touchable>
    </View>
  );
};

export const AddButton = ({ onPress }) => {
  return (
    <Touchable style={styles.addButtonContainer} onPress={onPress}>
      <Text style={styles.addLabel}>ADD</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 35,
    borderRadius: 10,
    borderColor: appColors.white,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: '700',
  },
  priceSubLabel: {
    color: appColors.gray,
  },

  addSubtractContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: appColors.pink,
  },
  addContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    height: '100%',
    borderColor: appColors.pink,
  },
  subtractContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    height: '100%',
    borderColor: appColors.pink,
  },
  addSubtractLabel: {
    color: appColors.pink,
    fontWeight: '600',
  },
  totalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLabel: {
    color: appColors.pink,
    fontWeight: '600',
  },
  addButtonContainer: {
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: appColors.pink,
  }
});

export default RectButton;
