import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@constants/colors';
import {Bold2432, Demi1216} from '@components/atoms/Texts';
import {APP_TEXTS} from '@constants/appTexts';
import {Chip} from './Chip';

interface BalanceDisplayProps {
  balance?: number;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance = 0,
}) => {
  return (
    <View>
      <Demi1216 style={styles.label}>{APP_TEXTS.AVAILABLE_BALANCE}</Demi1216>
      <View style={styles.balanceContainer}>
        <Chip
          label={APP_TEXTS.CURRENCY}
          style={styles.currencyChip}
          textStyle={styles.currencyChipText}
        />
        <Bold2432 style={styles.amount}>{balance.toFixed(2)}</Bold2432>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  label: {
    color: COLORS.white,
    opacity: 0.8,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  currency: {
    color: COLORS.white,
    marginRight: 4,
  },
  currencyChip: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: COLORS.cardGreen,
    marginLeft: 0,
  },
  currencyChipText: {
    color: COLORS.white,
  },
  amount: {
    color: COLORS.white,
  },
});
