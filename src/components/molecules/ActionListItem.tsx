import React from 'react';
import {View,  StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {COLORS} from '@constants/colors';
import {Medium1420, Regular1318} from '../atoms/Texts';

interface ActionListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
}

export const ActionListItem = ({
  icon,
  title,
  subtitle,
  hasSwitch,
  value,
  onValueChange,
  onPress,
}: ActionListItemProps) => (
  <TouchableOpacity disabled={hasSwitch} onPress={onPress} style={styles.container}>
    <View style={styles.iconCircle}>{icon}</View>
    <View style={styles.textContainer}>
      <Medium1420 style={styles.title}>{title}</Medium1420>
      <Regular1318 style={styles.subtitle}>{subtitle}</Regular1318>
    </View>
    {hasSwitch && (
      <Switch
        value={!!value}
        onValueChange={onValueChange}
        style={styles.switch}
        trackColor={{false: COLORS.white, true: COLORS.cardGreen}}
        thumbColor={COLORS.white}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginVertical: 16},
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.iconBg,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {flex: 1},
  title: {color: COLORS.textPrimary},
  subtitle: {color: COLORS.textSecondary, marginTop: 2},
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
});
