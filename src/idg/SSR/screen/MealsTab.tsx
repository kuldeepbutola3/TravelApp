import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Touchable } from 'src/components/Touchable';
import { AddButton, AddSubtractButton } from '../components/Buttons';
import PriceFooter from '../components/PriceFooter';

const MealsTab = ({ meals, dispatchToFlightReducer, selectedMeals, totalMealsPrice, currency }) => {
  const data = meals?.filter((_, i) => i !== 0);

  const renderMealOptionList = ({ item }) => {
    const numberOfSelectedMeals = selectedMeals.filter((meals) => meals.code === item.code);
    const handleAddButtonPress = () => dispatchToFlightReducer({ type: 'ADD_MEAL', payload: item });
    const handleRemoveButtonPress = () =>
      dispatchToFlightReducer({ type: 'REMOVE_MEAL', payload: item });
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 18 }}>Additional {item.weight} KG</Text>
          <Text style={{ fontSize: 16 }}>View Details</Text>
          <Text style={{ fontSize: 18 }}>
            {item.currency} {item.price}
          </Text>
        </View>

        <View>
          {numberOfSelectedMeals.length ? (
            <AddSubtractButton
              total={numberOfSelectedMeals.length}
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
    <View style={{ flex: 1, marginHorizontal: 8 }}>
      <FlatList
        data={data}
        renderItem={renderMealOptionList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Seperator}
      />

      <PriceFooter
        headerLabel={`${selectedMeals.length} Meals(s) Selected`}
        subHeaderLabel={``}
        priceLabel={`${currency} ${totalMealsPrice?.price}`}
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

export default React.memo(MealsTab);
