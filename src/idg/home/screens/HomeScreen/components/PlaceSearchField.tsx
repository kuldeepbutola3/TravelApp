import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FlightPlaces } from 'src/idg/flight/FlightModel';
const PlaceSearchField: FC<any> = ({
  type,
  onChangeText,
  places,
  onSelectPlace,
  selectedPlace,
  containerStyle,
  placeholder,
}) => {
  const inputRef = useRef<TextInput>(null);

  // const captureRef = (ref: TextInput) => (inputRef.current = ref);
  const [showInput, setShowInput] = useState(selectedPlace ? false : true);
  useEffect(() => {
    setShowInput(selectedPlace ? false : true);

    // inputRefMod.current.show();
    // console.log('inputRefMod.current', inputRefMod.current);
  }, [selectedPlace]);
  const placesAvailable =
    showInput && inputRef.current?.isFocused() && places instanceof Array && places.length > 0;

  console.log('placesAvailable.......', placesAvailable, places, showInput);

  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.type}>{type}</Text>

        {showInput ? (
          <>
            <TextInput
              ref={inputRef}
              placeholderTextColor="white"
              style={[styles.input, { flex: 1, width: '100%' }]}
              onChangeText={onChangeText}
              placeholder={placeholder}
            />
            {!showInput && <Text style={styles.input}>{selectedPlace?.airportName}</Text>}
          </>
        ) : (
          <TouchableOpacity style={{ width: '100%' }} onPress={() => setShowInput(true)}>
            <View style={styles.containerInner}>
              <Text style={styles.cityNameLabel}>{selectedPlace.cityName}</Text>
              <View style={styles.cityCodeLabelView}>
                <Text style={styles.cityCodeLabel}>{selectedPlace.cityCode}</Text>
              </View>
            </View>
            {!showInput && <Text style={styles.input}>{selectedPlace?.airportName}</Text>}
          </TouchableOpacity>
        )}
        {/* <ModalDropdown ref={inputRefMod} options={['option 1', 'option 2']}>
        </ModalDropdown> */}
      </View>
      {placesAvailable && (
        <View style={[styles.suggestionContainer]}>
          <ScrollView>
            {places.map((item: FlightPlaces) => {
              const handlePlaceSelect = () => onSelectPlace(item);
              return (
                <TouchableOpacity
                  onPress={handlePlaceSelect}
                  style={styles.suggestionItemContainer}
                >
                  <Text style={styles.cityLabel}>{item.cityName}</Text>
                  <Text style={styles.airportLabel}>{item.airportName}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={places}
            renderItem={({ item }) => {
              const handlePlaceSelect = () => onSelectPlace(item);
              return (
                <TouchableOpacity
                  onPress={handlePlaceSelect}
                  style={styles.suggestionItemContainer}
                >
                  <Text style={styles.cityLabel}>{item.cityName}</Text>
                  <Text style={styles.airportLabel}>{item.airportName}</Text>
                </TouchableOpacity>
              );
            }}
            // style={styles.placeAvailable}
          /> */}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  type: {
    color: 'white',
  },
  container: {
    height: 80,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 8,
  },
  suggestionContainer: {
    // position: 'absolute',
    width: '100%',
    // height: '100%',
    height: 200,
    backgroundColor: 'white',
    // zIndex: 200,
    // elevation: 4,
    marginTop: -9,
    marginBottom: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
    // flexWrap: 'nowrap',
  },
  suggestionItemContainer: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 8,
  },
  cityLabel: {
    color: 'black',
  },
  airportLabel: {
    color: 'black',
  },
  cityCodeLabelView: {
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginLeft: 5,
    borderColor: 'white',
  },
  cityCodeLabel: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cityNameLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },

  placeAvailable: { flex: 1, flexGrow: 1 },
  input: { color: 'white' },
  containerInner: { flexDirection: 'row' },
});
export default PlaceSearchField;
