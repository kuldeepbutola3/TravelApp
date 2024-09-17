import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { appColors } from 'src/styles/appColors';
import { AddButton, AddSubtractButton } from '../components/Buttons';
import PriceFooter from '../components/PriceFooter';

const BaggageTab = ({
  baggage,
  dispatchToFlightReducer,
  selectedBaggage,
  totalBaggagesPrice,
  currency,
}) => {
  const data = baggage?.filter((_, i) => i !== 0);
  const renderBaggageOptionList = ({ item }) => {
    const numberOfSelectedBagagge = selectedBaggage.filter((baggage) => baggage.code === item.code);
    const handleAddButtonPress = () =>
      dispatchToFlightReducer({ type: 'ADD_BAGGAGE', payload: item });
    const handleRemoveButtonPress = () =>
      dispatchToFlightReducer({ type: 'REMOVE_BAGGAGE', payload: item });
    return (
      <View style={styles.container}>

        <View>
          <Text style={{ fontSize: 18 }}>Additional {item.weight} KG</Text>
          <Text style={{ fontSize: 16, color: appColors.pink }}>View Details</Text>
          <Text style={{ fontSize: 18 }}>
            {item.currency} {item.price}
          </Text>
        </View>

        <View>
          {numberOfSelectedBagagge?.length ? (
            <AddSubtractButton
              total={numberOfSelectedBagagge.length}
              onPressSubtract={handleRemoveButtonPress}
              onPressAdd={handleAddButtonPress}
            />
          ) : (
            <AddButton onPress={handleAddButtonPress} />
          )}
        </View>
      </View>
    );
  };

  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderWidth: 0.5,
          borderColor: '#EAEAEA',
          width: '100%',
          marginVertical: 10,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 8, marginTop: 10 }}>
      <FlatList
        data={data}
        renderItem={renderBaggageOptionList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Seperator}
      />

      <PriceFooter
        headerLabel={`${selectedBaggage.length} Baggage(s) Selected`}
        subHeaderLabel={``}
        priceLabel={`${currency} ${totalBaggagesPrice?.price}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default React.memo(BaggageTab);
