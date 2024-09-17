import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from 'src/styles/appColors';

const PriceFooter = ({ headerLabel, subHeaderLabel, priceLabel }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerLabel}>{headerLabel}</Text>
        <Text>{subHeaderLabel}</Text>
      </View>
      <View>
        <Text>{priceLabel}</Text>
        <Text style={styles.priceSubLabel}>Add to Fare</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: appColors.lightGrey,
  },
  headerLabel: {
    fontWeight: '600',
  },
  priceSubLabel: {
    color: appColors.gray,
  },
});

export default PriceFooter;
