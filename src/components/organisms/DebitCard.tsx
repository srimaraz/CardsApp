import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '@constants/colors';
import {Bold2230, Demi1420} from '@components/atoms/Texts';
import AspireLogo from '@assets/icons/AspireLogo';
import VisaLogo from '@assets/icons/Visa';
import {Card} from '@store/cardsSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { APP_TEXTS } from '@constants/appTexts';

interface DebitCardProps {
  card: Card;
  isCardNumberVisible: boolean;
}

export const DebitCard = React.memo((props: DebitCardProps) => {
  const {card, isCardNumberVisible} = props;
  const {metaData, isCardFrozen} = card;
  const {cardName, cardNumber, expiry, cvv} = metaData;

  const cardStyles = useMemo(() => [
    styles.card,
    isCardFrozen && styles.frozenCard,
  ], [isCardFrozen]);

  const renderCardNumber = useCallback(() => {
    const digitsOnly = cardNumber.replace(/\s+/g, '');
    const groups = digitsOnly.match(/.{1,4}/g) || [];

    return (
      <View style={styles.numberContainer}>
        {groups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.group}>
            {group.split('').map((char, charIndex) => {
              const isLastGroup = groupIndex === groups.length - 1;
              const shouldShow = isCardNumberVisible || isLastGroup;

              return shouldShow ? (
                <Demi1420 key={charIndex} style={styles.digit}>
                  {char}
                </Demi1420>
              ) : (
                <Icon
                  key={charIndex}
                  name="circle"
                  size={10}
                  color={COLORS.white}
                  style={styles.dot}
                />
              );
            })}
          </View>
        ))}
      </View>
    );
  }, [cardNumber, isCardNumberVisible]);

  const cvvDisplay = useMemo(() => {
    if (isCardNumberVisible) {
      return <Demi1420 style={styles.meta}>{cvv}</Demi1420>;
    }
    return (
      <View style={styles.cvvMask}>
        <Text style={styles.cvvStars}>{APP_TEXTS.CARD_CVV_MASK}</Text>
      </View>
    );
  }, [isCardNumberVisible, cvv]);

  return (
    <View style={cardStyles}>
      <View style={styles.issuerContainer}>
        <AspireLogo width={74} height={21} />
      </View>
      <Bold2230 style={styles.name}>{cardName}</Bold2230>
      {renderCardNumber()}
      <View style={styles.row}>
        <Demi1420 style={styles.meta}>{APP_TEXTS.CARD_THRU_LABEL} {expiry}</Demi1420>
        <View style={styles.cvRow}>
          <Demi1420 style={styles.meta}>{APP_TEXTS.CARD_CVV_LABEL}</Demi1420>
          {cvvDisplay}
        </View>
      </View>
      <VisaLogo style={styles.visa} width={74} height={21} />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardGreen,
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  frozenCard: {
    backgroundColor: COLORS.inactive,
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
    fontSize: 14,
    textAlign: 'center',
  },
  maskedNumber: {
    color: COLORS.white,
    letterSpacing: 2,
    fontSize: 14,
    textAlign: 'center',
  },
  visibleNumber: {
    color: COLORS.white,
    letterSpacing: 2,
    fontSize: 14,
    textAlign: 'center',
  },
  row: {flexDirection: 'row', gap: 32, marginBottom: 8},
  meta: {color: COLORS.white, fontSize: 14},
  visa: {
    alignSelf: 'flex-end',
  },
  numberContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  group: {
    flexDirection: 'row',
    gap: 4,
  },
  cvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    textAlign: 'center',
  },
  cvvMask: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: COLORS.white,
    verticalAlign: 'middle',
    paddingTop: 6,
  },
  cvvStars: {
    fontSize: 22,
    lineHeight: 22,
    textAlign: 'center',
    color: COLORS.white,
  },
  digit: {
    fontSize: 14,
    color: COLORS.white,
  },
  dot: {
    alignSelf: 'center',
  },
});
