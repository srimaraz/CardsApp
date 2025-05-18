import {APP_TEXTS} from '@constants/appTexts';
import InsightIcon from '@assets/icons/Insight';
import Limit1 from '@assets/icons/Limit1';
import Freeze from '@assets/icons/Freeze';
import CommerceIcon from '@assets/icons/Commerce';
import TransferIcon from '@assets/icons/Transfer';
import {DEBIT_ROUTES} from '@navigation/config/stackConfig';
import {
  addDailyLimitRequest,
  freezeCardRequest,
  removeDailyLimitRequest,
} from '@store/cardsSlice';

export interface ActionListConfig {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  value?: boolean;
}

export const getActionListConfig = (
  selectedCard: any,
  dispatch: any,
  navigation: any,
  setShowAddCardModal: (show: boolean) => void,
): ActionListConfig[] => [
  {
    icon: <InsightIcon width={32} height={32} />,
    title: APP_TEXTS.TOP_UP_TITLE,
    subtitle: APP_TEXTS.TOP_UP_SUBTITLE,
    onPress: () => {
      // do nothing
    },
  },
  {
    icon: <Limit1 width={32} height={32} />,
    title: APP_TEXTS.WEEKLY_LIMIT_TITLE,
    subtitle: selectedCard?.isWeeklyLimitEnabled
      ? APP_TEXTS.WEEKLY_LIMIT_SUBTITLE_ENABLED
      : APP_TEXTS.WEEKLY_LIMIT_SUBTITLE,
    hasSwitch: true,
    onValueChange: () => {
      if (selectedCard?.isWeeklyLimitEnabled) {
        dispatch(
          removeDailyLimitRequest({
            cardId: selectedCard?.id,
          }),
        );
      } else {
        navigation.navigate(DEBIT_ROUTES.SPENDING_LIMIT_SCREEN, {
          cardId: selectedCard?.id,
          onSuccess: (cardId: string, limit: number) => {
            dispatch(
              addDailyLimitRequest({
                cardId: cardId,
                limit: limit,
              }),
            );
          },
        });
      }
    },
    value: selectedCard?.isWeeklyLimitEnabled,
  },
  {
    icon: <Freeze width={32} height={32} />,
    title: APP_TEXTS.FREEZE_CARD_TITLE,
    subtitle: selectedCard?.isCardFrozen
      ? APP_TEXTS.FREEZE_CARD_SUBTITLE_FROZEN
      : APP_TEXTS.FREEZE_CARD_SUBTITLE,
    hasSwitch: true,
    onValueChange: () => {
      dispatch(
        freezeCardRequest({
          cardId: selectedCard?.id,
          freeze: !selectedCard?.isCardFrozen,
        }),
      );
    },
    value: selectedCard?.isCardFrozen,
  },
  {
    icon: <CommerceIcon width={22} height={22} />,
    title: APP_TEXTS.GET_NEW_CARD,
    subtitle: APP_TEXTS.GET_NEW_CARD_SUBTITLE,
    onPress: () => {
      setShowAddCardModal(true);
    },
  },
  {
    icon: <TransferIcon width={32} height={32} />,
    title: APP_TEXTS.DEACTIVATED_CARDS,
    subtitle: APP_TEXTS.DEACTIVATED_CARDS_SUBTITLE,
  },
];
