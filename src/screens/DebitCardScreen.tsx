import HideIcon from '@assets/icons/Hide';
import HomeIcon from '@assets/icons/Home';
import ShowIcon from '@assets/icons/Show';
import { BalanceDisplay } from '@components/atoms/BalanceDisplay';
import { SpendingLimitBar } from '@components/atoms/SpendingLimitBar';
import { Bold2432, Demi1216 } from '@components/atoms/Texts';
import { ActionListItem } from '@components/molecules/ActionListItem';
import { AddNewCardModal } from '@components/organisms/AddNewCardModal';
import { DebitCard } from '@components/organisms/DebitCard';
import { ActionListConfig, getActionListConfig } from '@config/actionListConfig';
import { APP_TEXTS } from '@constants/appTexts';
import { COLORS } from '@constants/colors';
import { SCREEN_HEIGHT } from '@constants/common';
import type { Card } from '@store/cardsSlice';
import { addNewCardRequest, fetchCardsRequest } from '@store/cardsSlice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const TOP_SECTION_HEIGHT = SCREEN_HEIGHT * 0.3;
const CARD_WIDTH = Dimensions.get('window').width - 48; // Full width minus padding

const DebitCardScreen = ({navigation}: {navigation: any}) => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isCardNumberVisible, setIsCardNumberVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const cards = useSelector((state: any) => state.cards.cards);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const selectedCard = cards[selectedCardIndex];

  const toggleCardNumberVisibility = useCallback(() => {
    setIsCardNumberVisible(prev => !prev);
  }, []);

  useEffect(() => {
    dispatch(fetchCardsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCard?.isWeeklyLimitEnabled) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedCard?.isWeeklyLimitEnabled, fadeAnim]);

  const actionListConfig = getActionListConfig(
    selectedCard,
    dispatch,
    navigation,
    setShowAddCardModal,
  );

  const renderCard = ({item}: {item: Card}) => (
    <View style={[styles.cardContainer]}>
      <Pressable
        onPress={toggleCardNumberVisibility}
        style={styles.visibilityToggle}>
        {isCardNumberVisible ? (
          <HideIcon
            color={
              item.isCardFrozen ? (COLORS.inactive as any) : COLORS.cardGreen
            }
          />
        ) : (
          <ShowIcon
            color={
              item.isCardFrozen ? (COLORS.inactive as any) : COLORS.cardGreen
            }
          />
        )}
        <Demi1216
          style={[
            {color: COLORS.cardGreen},
            item.isCardFrozen && {color: COLORS.textSecondary},
          ]}>
          {isCardNumberVisible
            ? APP_TEXTS.HIDE_CARD_NUMBER
            : APP_TEXTS.SHOW_CARD_NUMBER}
        </Demi1216>
      </Pressable>
      <DebitCard isCardNumberVisible={isCardNumberVisible} card={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Top Section */}
        <Animated.View
          style={[
            styles.topSection,
            styles.animatedTopSection,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 60],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 40],
                    outputRange: [0, -40],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.headerContainer}>
            <Bold2432>{APP_TEXTS.DEBIT_CARD_HEADER}</Bold2432>
            <HomeIcon color={COLORS.cardGreen} />
          </View>
          <BalanceDisplay balance={selectedCard?.cardBalance} />
        </Animated.View>

        {/* White Section */}
        <Animated.View style={styles.bottomSection}>
          <View style={styles.cardWrapper}>
            <FlatList
              data={cards}
              renderItem={renderCard}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH}
              onMomentumScrollEnd={event => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / CARD_WIDTH,
                );
                setSelectedCardIndex(newIndex);
              }}
              contentContainerStyle={styles.carouselContainer}
            />
          </View>

          <Animated.View
            style={[styles.spendingLimitContainer, {opacity: fadeAnim}]}>
            {selectedCard?.isWeeklyLimitEnabled && (
              <SpendingLimitBar
                current={selectedCard.spentBalance || 0}
                max={selectedCard.weeklyLimit || 0}
                currency="$"
                isCardFrozen={selectedCard?.isCardFrozen}
              />
            )}
          </Animated.View>

          <View style={styles.actionListContainer}>
            {actionListConfig.map((config: ActionListConfig, index: number) => (
              <ActionListItem key={index} {...config} />
            ))}
          </View>
        </Animated.View>
      </Animated.ScrollView>
      <AddNewCardModal
        visible={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        onAdd={(cardName: string) => {
          const action = addNewCardRequest({cardName});
          dispatch(action);
          setShowAddCardModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: COLORS.primary,
  },
  animatedTopSection: {
    height: TOP_SECTION_HEIGHT,
  },
  headerContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 80,
    zIndex: 1,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
    marginTop: -24,
  },
  cardWrapper: {
    alignItems: 'center',
    zIndex: 2,
    marginTop: -140,
    marginBottom: 0,
  },
  carouselContainer: {},
  cardContainer: {
    width: CARD_WIDTH,
  },
  visibilityToggle: {
    height: 48,
    width: 160,
    backgroundColor: COLORS.white,
    alignSelf: 'flex-end',
    marginBottom: -12,
    paddingBottom: 12,
    borderRadius: 6,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 4,
  },
  spendingLimitContainer: {
    width: '100%',
  },
  actionListContainer: {
    marginTop: 24,
  },
});
