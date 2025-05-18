import HomeIcon from '@assets/icons/Home';
import {BalanceDisplay} from '@components/atoms/BalanceDisplay';
import {Bold2432, Demi1216} from '@components/atoms/Texts';
import {ActionListItem} from '@components/molecules/ActionListItem';
import {DebitCard} from '@components/organisms/DebitCard';
import {APP_TEXTS} from '@constants/appTexts';
import {COLORS} from '@constants/colors';
import React, {useCallback, useState, useRef} from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import HideIcon from '@assets/icons/Hide';
import ShowIcon from '@assets/icons/Show';
import CommerceIcon from '../../assets/icons/Commerce';
import InsightIcon from '../../assets/icons/Insight';
import TransferIcon from '../../assets/icons/Transfer';
import {SpendingLimitBar} from '@components/atoms/SpendingLimitBar';
import {SCREEN_HEIGHT} from '@constants/common';
import { AddNewCardModal } from '@components/organisms/AddNewCardModal';
import Freeze from '@assets/icons/Freeze';
import Limit1 from '@assets/icons/Limit1';

const TOP_SECTION_HEIGHT = SCREEN_HEIGHT / 4; // Adjust to match your top section's height

const DebitCardScreen = () => {
  const [userPreferences, setUserPreferences] = useState({
    isCardNumberVisible: true,
    isWeeklyLimitEnabled: true,
    isCardFrozen: false,
    hasDeactivatedCards: true,
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleCardNumberVisibility = useCallback(() => {
    setUserPreferences(prev => ({
      ...prev,
      isCardNumberVisible: !prev.isCardNumberVisible,
    }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 32}}
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
            {
              height: TOP_SECTION_HEIGHT,
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
          <BalanceDisplay />
        </Animated.View>

        {/* White Section */}
        <Animated.View
          style={[
            styles.bottomSection,
            // {
            //   marginTop: scrollY.interpolate({
            //     inputRange: [0, TOP_SECTION_HEIGHT],
            //     outputRange: [0, -TOP_SECTION_HEIGHT + 24], // 24 is the border radius
            //     extrapolate: 'clamp',
            //   }),
            //   borderTopLeftRadius: scrollY.interpolate({
            //     inputRange: [0, TOP_SECTION_HEIGHT],
            //     outputRange: [24, 0],
            //     extrapolate: 'clamp',
            //   }),
            //   borderTopRightRadius: scrollY.interpolate({
            //     inputRange: [0, TOP_SECTION_HEIGHT],
            //     outputRange: [24, 0],
            //     extrapolate: 'clamp',
            //   }),
            // },
          ]}>
          <View style={styles.cardWrapper}>
            <Pressable
              onPress={toggleCardNumberVisibility}
              style={{
                height: 48,
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
              }}>
              {userPreferences.isCardNumberVisible ? (
                <HideIcon />
              ) : (
                <ShowIcon />
              )}
              {userPreferences.isCardNumberVisible ? (
                <Demi1216 style={{color: COLORS.cardGreen}}>
                  {APP_TEXTS.HIDE_CARD_NUMBER}
                </Demi1216>
              ) : (
                <Demi1216 style={{color: COLORS.cardGreen}}>
                  {APP_TEXTS.SHOW_CARD_NUMBER}
                </Demi1216>
              )}
            </Pressable>
            <DebitCard
              isCardNumberVisible={userPreferences.isCardNumberVisible}
            />
          </View>
          {userPreferences.isWeeklyLimitEnabled && (
            <SpendingLimitBar current={745} max={3000} currency="$" />
          )}
          <ActionListItem
            icon={<InsightIcon width={32} height={32} />}
            //icon={<TransferIcon width={32} height={32} />}
            title={APP_TEXTS.TOP_UP_TITLE}
            subtitle={APP_TEXTS.TOP_UP_SUBTITLE}
            onPress={() => {
              console.log('top up');
            }}
          />
          <ActionListItem
            icon={<Limit1 width={32} height={32} />}
            title={APP_TEXTS.WEEKLY_LIMIT_TITLE}
            subtitle={APP_TEXTS.WEEKLY_LIMIT_SUBTITLE}
            hasSwitch
            onValueChange={() => {
              // setUserPreferences(prev => ({
              //   ...prev,
              //   isWeeklyLimitEnabled: !prev.isWeeklyLimitEnabled,
              // }));
            }}
            value={userPreferences.isWeeklyLimitEnabled}
          />
          <TouchableOpacity
            onPress={() => {
              setShowAddCardModal(true);
            }}>
            <Demi1216 style={{color: COLORS.cardGreen}}>
              {APP_TEXTS.WEEKLY_LIMIT_TITLE}
            </Demi1216>
          </TouchableOpacity>
          <ActionListItem
            icon={<Freeze width={32} height={32} />}
            title={APP_TEXTS.FREEZE_CARD_TITLE}
            subtitle={APP_TEXTS.FREEZE_CARD_SUBTITLE}
            hasSwitch
            onValueChange={() => {
              setUserPreferences(prev => ({
                ...prev,
                isCardFrozen: !prev.isCardFrozen,
              }));
            }}
            value={userPreferences.isCardFrozen}
          />
          <ActionListItem
            icon={<CommerceIcon width={22} height={22} />}
            title={APP_TEXTS.GET_NEW_CARD}
            subtitle={APP_TEXTS.GET_NEW_CARD_SUBTITLE}
          />
          <ActionListItem
            icon={<TransferIcon width={32} height={32} />}
            title={APP_TEXTS.DEACTIVATED_CARDS}
            subtitle={APP_TEXTS.DEACTIVATED_CARDS_SUBTITLE}
          />
        </Animated.View>
      </Animated.ScrollView>
      <AddNewCardModal
        visible={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        onAdd={(cardName: string) => {
          // Handle new card name here
          console.log('New card added:', cardName);
        }}
      />
    </SafeAreaView>
  );
};
export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    marginBottom: 32,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
  },
  cardWrapper: {
    alignItems: 'center',
    zIndex: 2,
    marginTop: -120, // Push card down into the white area
    marginBottom: 0,
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
    //paddingTop: CARD_OVERLAP, // Add top padding so content starts below the card
  },
});
