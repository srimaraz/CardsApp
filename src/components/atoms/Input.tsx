import React, {useCallback} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS} from '@constants/colors';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: 'default' | 'numeric';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  style,
  inputStyle,
  testID,
}) => {
  const handleChangeText = useCallback(
    (text: string) => {
      if (keyboardType === 'numeric') {
        if (/^\d*$/.test(text)) {
          onChangeText(text);
        }
      } else {
        onChangeText(text);
      }
    },
    [keyboardType, onChangeText],
  );
  return (
    <View style={style}>
      <TextInput
        testID={testID}
        style={[styles.input, inputStyle, error && styles.inputError]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.inactive}
        onChangeText={handleChangeText}
        value={value}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.inactive,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
