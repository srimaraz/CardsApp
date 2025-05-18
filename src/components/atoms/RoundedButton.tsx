import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@constants/colors';
import {  Demi1620 } from './Texts';

interface RoundedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ title, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled, style]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled}
  >
    <Demi1620 style={styles.text}>{title}</Demi1620>
  </TouchableOpacity>
);
export default RoundedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.cardGreen,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
  },
  disabled: {
    backgroundColor: COLORS.inactive,
  },
}); 