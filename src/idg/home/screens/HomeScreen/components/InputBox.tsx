import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Input } from 'react-native-elements';

interface IInputBox {
  label: string;
  value: string;
  onChangeText(value: string): void;
  containerStyle: ViewStyle;
  disabled: boolean;
}

const InputBox = ({ label, value, onChangeText, containerStyle, disabled }: IInputBox) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        inputContainerStyle={styles.inputContainer}
        style={styles.input}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  label: {
    color: '#b2bec3',
    opacity: 0.9,
    fontSize: 16,
    fontWeight: '500',
  },
  input: { color: 'white', fontSize: 18, width: '100%', marginTop: 20 },
  inputContainer: { borderBottomWidth: 0 },
});

export default InputBox;
