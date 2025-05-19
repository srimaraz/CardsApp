import { COLORS } from '@constants/colors';
import React, { useMemo } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Demi1216 } from './Texts';

interface ChipProps {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Chip = React.memo<ChipProps>(({ label, onPress, style, textStyle }) => {
  const containerStyle = useMemo(() => [styles.chip, style], [style]);
  const labelStyle = useMemo(() => [styles.text, textStyle], [textStyle]);

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Demi1216 style={labelStyle}>{label}</Demi1216>
    </TouchableOpacity>
  );
});

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