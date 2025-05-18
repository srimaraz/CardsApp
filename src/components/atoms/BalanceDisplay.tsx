import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';
import {APP_TEXTS} from '@constants/appTexts';
import {Medium1420, Bold2432} from './Texts';

export const BalanceDisplay = () => (
  <View style={styles.container}>
    <Medium1420 style={styles.label}>{APP_TEXTS.AVAILABLE_BALANCE}</Medium1420>
    <View style={styles.row}>
      <View style={styles.currencyTag}>
        <Text style={styles.currencyText}>{APP_TEXTS.CURRENCY}</Text>
      </View>
      <Bold2432 style={styles.amount}>{APP_TEXTS.BALANCE_AMOUNT}</Bold2432>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {marginBottom: 24},
  label: {color: COLORS.white, marginBottom: 10},
  row: {flexDirection: 'row', alignItems: 'center'},
  currencyTag: {
    backgroundColor: COLORS.cardGreen,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  currencyText: {color: COLORS.white},
  amount: {color: COLORS.white},
});
