import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

interface HeaderBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer} disabled={!onLeftPress}>
      {leftIcon}
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onRightPress} style={styles.iconContainer} disabled={!onRightPress}>
      {rightIcon}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inactive,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
}); 