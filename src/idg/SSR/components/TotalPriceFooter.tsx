import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Touchable } from 'src/components/Touchable';
import { appColors } from 'src/styles/appColors';

const TotalPriceFooter = ({ currency, price, onPress }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          {currency} {price}
        </Text>
      </View>

      <Touchable onPress={onPress} style={styles.buttonContainer}>
        <Text style={{ color: 'white', fontWeight: '600' }}>Next</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: appColors.black,
    padding: 10,
    height: 80,
  },
  buttonContainer: {
    width: 120,
    backgroundColor: appColors.pink,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TotalPriceFooter;
