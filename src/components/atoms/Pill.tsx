import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@constants/colors';

interface PillProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Pill = React.memo<PillProps>(({ label, selected, onPress, style }) => {
  const containerStyle = useMemo(() => [
    styles.pill,
    selected && styles.selected,
    style,
  ], [selected, style]);

  const textStyle = useMemo(() => [
    styles.text,
    selected && styles.selectedText
  ], [selected]);

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
});

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
