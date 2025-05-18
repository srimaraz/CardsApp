import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@constants/colors';

interface PillProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Pill: React.FC<PillProps> = ({ label, selected, onPress, style }) => (
  <TouchableOpacity
    style={[styles.pill, selected && styles.selected, style]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    margin: 4,
  },
  selected: {
    backgroundColor: COLORS.cardGreen,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
}); 