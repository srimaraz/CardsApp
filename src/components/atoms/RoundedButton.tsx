import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@constants/colors';
import { Demi1620 } from './Texts';

interface RoundedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const RoundedButton = React.memo<RoundedButtonProps>(({ 
  title, 
  onPress, 
  disabled, 
  style,
  testID 
}) => {
  const containerStyle = useMemo(() => [
    styles.button,
    disabled && styles.disabled,
    style
  ], [disabled, style]);

  return (
    <TouchableOpacity
      testID={testID}
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Demi1620 style={styles.text}>{title}</Demi1620>
    </TouchableOpacity>
  );
});

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

export default RoundedButton;
