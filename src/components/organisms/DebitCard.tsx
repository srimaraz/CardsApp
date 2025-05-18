import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';
import {APP_TEXTS} from '@constants/appTexts';
import {Bold2230, Demi1420} from '@components/atoms/Texts';
import AspireLogo from '@assets/icons/AspireLogo';
import VisaLogo from '@assets/icons/Visa';

interface DebitCardProps {
  isCardNumberVisible?: boolean;
}

export const DebitCard = (props: DebitCardProps) => {
  const {isCardNumberVisible = true} = props;

  const formatCardNumber = (number: string) => {
    if (isCardNumberVisible) {
      return number;
    }
    // Keep only the last 4 digits, replace rest with bullet points
    const lastFour = number.slice(-4);
    return (
      <View style={styles.numberContainer}>
        <Demi1420 style={styles.maskedNumber}>•••• •••• •••• </Demi1420>
        <Demi1420 style={styles.visibleNumber}>{lastFour}</Demi1420>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.issuerContainer}>
        <AspireLogo width={74} height={21} />
      </View>
      <Bold2230 style={styles.name}>{APP_TEXTS.CARDHOLDER_NAME}</Bold2230>
      {isCardNumberVisible ? (
        <Demi1420 style={styles.number}>{APP_TEXTS.CARD_NUMBER}</Demi1420>
      ) : (
        formatCardNumber(APP_TEXTS.CARD_NUMBER)
      )}
      <View style={styles.row}>
        <Demi1420 style={styles.meta}>{APP_TEXTS.CARD_THRU}</Demi1420>
        <Demi1420 style={styles.meta}>{APP_TEXTS.CARD_CVV}</Demi1420>
      </View>
      <VisaLogo style={styles.visa} width={74} height={21} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardGreen,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.cardGreen,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  issuerContainer: {
    alignSelf: 'flex-end',
  },
  logo: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {marginBottom: 24, marginTop: 24},
  number: {
    color: COLORS.white,
    letterSpacing: 2,
    fontSize: 18,
    marginBottom: 16,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 24,
  },
  maskedNumber: {
    color: COLORS.white,
    letterSpacing: 2,
    fontSize: 24,
    lineHeight: 24,
  },
  visibleNumber: {
    color: COLORS.white,
    letterSpacing: 2,
    fontSize: 18,
    lineHeight: 24,
  },
  row: {flexDirection: 'row', gap: 32, marginBottom: 8},
  meta: {color: COLORS.white, fontSize: 14},
  visa: {
    alignSelf: 'flex-end',
  },
});
