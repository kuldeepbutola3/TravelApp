import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements';

const PlaceSearchField = ({
  type,
  onChangeText,
  places,
  onSelectPlace,
  selectedPlace,
  containerStyle,
  placeholder,
  suggestionContainerStyle,
}) => {
  const inputRef = useRef(null);
  const captureRef = (ref) => (inputRef.current = ref);
  const [showInput, setShowInput] = useState(selectedPlace ? false : true);
  useEffect(() => {
    setShowInput(selectedPlace ? false : true);
  }, [selectedPlace]);
  const placesAvailable =
    showInput && inputRef.current?.isFocused() && places instanceof Array && places.length;
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.type}>{type}</Text>
        {showInput ? (
          <TextInput
            ref={captureRef}
            placeholderTextColor="white"
            style={{ color: 'white' }}
            onChangeText={onChangeText}
            placeholder={placeholder}
          />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.cityNameLabel} onPress={() => setShowInput(true)}>
              {selectedPlace.cityName}
            </Text>
            <Text style={styles.cityCodeLabel} onPress={() => setShowInput(true)}>
              {selectedPlace.cityCode}
            </Text>
          </View>
        )}
        {!showInput && <Text style={{ color: 'white' }}>{selectedPlace?.airportName}</Text>}
      </View>

      {placesAvailable && (
        <View style={[styles.suggestionContainer, suggestionContainerStyle]}>
          <FlatList
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
            style={{ flex: 1, height: '100%', width: '100%' }}
          />
        </View>
      )}
    </>
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
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 2,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
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
  cityCodeLabel: {
    color: 'white',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginLeft: 5,
    borderColor: 'white',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cityNameLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default PlaceSearchField;
