import React from 'react';
import { Text, View } from 'react-native';
import { Touchable } from 'src/components/Touchable';
import { AuraStackScreen } from 'src/types/navigationTypes';

export const TeavellerScreen: AuraStackScreen = () => {
  return (
    <View>
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
          // onPress={handleRemoveButtonPress}
        >
          <Text style={{ fontSize: 20 }}>-</Text>
        </Touchable>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text>{numberOfSelectedBagagge.length}</Text> */}
        </View>
        <Touchable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1,
            height: '100%',
          }}
          // onPress={handleAddButtonPress}
        >
          <Text style={{ fontSize: 20 }}>+</Text>
        </Touchable>
      </View>
    </View>
  );
};
