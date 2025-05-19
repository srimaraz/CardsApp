import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '@constants/colors';
import { APP_TEXTS } from '@constants/appTexts';
import { Medium1420 } from './Texts';
import { ProgressBar } from './ProgressBar';


interface SpendingLimitBarProps {
  current: number;
  max: number;
  currency?: string;
  label?: string;
  isCardFrozen?: boolean;
}

export const SpendingLimitBar = React.memo<SpendingLimitBarProps>(({
  current,
  max,
  currency = 'S$',
  label = APP_TEXTS.DEBIT_CARD_SPENDING_LIMIT,
  isCardFrozen = false,
}) => {
  const percent = useMemo(() => Math.min(current / max, 1), [current, max]);

  const currentValueStyle = useMemo(() => [
    styles.currentValue,
    isCardFrozen && styles.inactiveValue
  ], [isCardFrozen]);

  const progressBarProps = useMemo(() => ({
    percent,
    barColor: isCardFrozen ? COLORS.inactive : COLORS.cardGreen,
    bgColor: isCardFrozen ? COLORS.lightGray : COLORS.cardGreen + '1F',
    height: 16,
    borderRadius: 12
  }), [percent, isCardFrozen]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Medium1420 style={styles.label}>{label}</Medium1420>
        <View style={styles.valuesRow}>
          <Text style={currentValueStyle}>
            {currency}{current.toLocaleString()}
          </Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.maxValue}>
            {currency}{max.toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.barBg}>
        <ProgressBar {...progressBarProps} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: COLORS.textPrimary,
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentValue: {
    color: COLORS.cardGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveValue: {
    color: COLORS.textSecondary,
  },
  divider: {
    color: COLORS.inactive,
    marginHorizontal: 4,
    fontSize: 16,
  },
  maxValue: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  barBg: {
    marginTop: 4,
  },
});
