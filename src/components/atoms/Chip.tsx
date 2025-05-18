import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '@constants/colors';
import { Demi1216 } from './Texts';

interface ChipProps {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({ label, onPress, style,textStyle }) => (
  <TouchableOpacity
    style={[styles.chip, style]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Demi1216 style={[styles.text,textStyle]}>{label}</Demi1216>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: COLORS.cardGreen+'1A',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
  },
  text: {
    color: COLORS.cardGreen,
  },
}); 