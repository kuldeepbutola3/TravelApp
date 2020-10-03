import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { Touchable } from 'src/components/Touchable';
import { Text } from 'src/components/Text';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { HeaderTabs } from 'src/constants/enums';


export const Header: FC<any> = (props) => {
  return (
    <View style={styles.container}>
      <Touchable
        activeOpacity={1}
        onPress={props.onPressFlightsTab}
        style={[
          styles.buttonContainer,
          props.selectedTab === HeaderTabs.Flights && tabHighlightStyle,
        ]}
      >
        <Icon name="plane" size={icon.size} color={icon.color} />
        <Text style={styles.buttonLabel}>Flights</Text>
      </Touchable>
      <Touchable
        activeOpacity={1}
        onPress={props.onPressHotelsTab}
        style={[
          styles.buttonContainer,
          props.selectedTab === HeaderTabs.Hotels && tabHighlightStyle,
        ]}
      >
        <Icon name="home" size={icon.size} color={icon.color} />
        <Text style={styles.buttonLabel}>Hotels</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    flexDirection: 'row',
  },
  buttonContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
});

const icon = {
  size: 20,
  color: '#fff',
};

const tabHighlightStyle = {
  borderBottomColor: 'white',
  borderBottomWidth: 3,
};
