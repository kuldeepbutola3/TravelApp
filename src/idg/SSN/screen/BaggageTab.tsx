import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Touchable } from 'src/components/Touchable';

const BaggageTab = ({ baggage, dispatchToFlightReducer, selectedBaggage, totalBaggagesPrice }) => {
  const data = baggage?.filter((_, i) => i !== 0);
  console.log(baggage, selectedBaggage);
  const renderBaggageOptionList = ({ item }) => {
    const numberOfSelectedBagagge = selectedBaggage.filter((baggage) => baggage.code === item.code);
    const handleAddButtonPress = () =>
      dispatchToFlightReducer({ type: 'ADD_BAGGAGE', payload: item });
    const handleRemoveButtonPress = () =>
      dispatchToFlightReducer({ type: 'REMOVE_BAGGAGE', payload: item });
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View>
            <Text style={{ fontSize: 18 }}>Additional {item.weight} KG</Text>
            <Text style={{ fontSize: 16 }}>View Details</Text>
            <Text style={{ fontSize: 18 }}>
              {item.currency} {item.price}
            </Text>
          </View>
          <View>
            {numberOfSelectedBagagge.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  width: 100,
                  height: 30,
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Touchable
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 1,
                    height: '100%',
                  }}
                  onPress={handleRemoveButtonPress}
                >
                  <Text style={{ fontSize: 20 }}>-</Text>
                </Touchable>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{numberOfSelectedBagagge.length}</Text>
                </View>
                <Touchable
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 1,
                    height: '100%',
                  }}
                  onPress={handleAddButtonPress}
                >
                  <Text style={{ fontSize: 20 }}>+</Text>
                </Touchable>
              </View>
            ) : (
              <Touchable
                style={{
                  width: 100,
                  height: 30,
                  borderRadius: 5,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleAddButtonPress}
              >
                <Text>ADD</Text>
              </Touchable>
            )}
          </View>
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
        renderItem={renderBaggageOptionList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Seperator}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: 'grey',
        }}
      >
        <View>
          <Text>{selectedBaggage.length} Baggage(s) Selected</Text>
          <Text></Text>
        </View>
        <View>
          <Text>{totalBaggagesPrice.price}</Text>
          <Text>Add to Fare</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(BaggageTab);
