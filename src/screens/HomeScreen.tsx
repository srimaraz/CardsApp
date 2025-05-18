import { Demi1420 } from '@components/atoms/Texts';
import { APP_TEXTS } from '@constants/appTexts';
import { COLORS } from '@constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = () => (
  <View style={styles.container}>
   <Demi1420 style={styles.title}>{APP_TEXTS.HOME_SCREEN}</Demi1420>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.primary,
  },
});
