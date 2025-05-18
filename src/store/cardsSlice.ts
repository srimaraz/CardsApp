import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardData} from '../dumyData/cardData';

export interface Card {
  id: string;
  metaData: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardType: string;
    cardBrand: string;
    cardIssuer: string;
    cardIssuerLogo: string;
    cardIssuerColor: string;
    cardIssuerTextColor: string;
  };
  cardBalance: number;
  isCardFrozen: boolean;
  isWeeklyLimitEnabled?: boolean;
  weeklyLimit?: number;
  spentBalance?: number;
}

interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: cardData,
  loading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    fetchCardsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCardsSuccess(state, action: PayloadAction<Card[]>) {
      state.loading = false;
      state.cards = action.payload;
    },
    fetchCardsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    topUpBalanceRequest(state) {
      state.loading = true;
      state.error = null;
    },
    topUpBalanceSuccess(state, action: PayloadAction<Card>) {
      state.loading = false;
      state.cards = state.cards.map(c =>
        c.id === action.payload.id ? action.payload : c,
      );
    },
    topUpBalanceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    freezeCardRequest(
      state,
      action: PayloadAction<{cardId: string; freeze: boolean}>,
    ) {
      state.loading = true;
      state.error = null;
      // Optimistic update
      state.cards = state.cards.map(card =>
        card.id === action.payload.cardId
          ? {...card, isCardFrozen: action.payload.freeze}
          : card,
      );
    },
    freezeCardSuccess(state, _action: PayloadAction<Card>) {
      state.loading = false;
    },
    freezeCardFailure(
      state,
      action: PayloadAction<{cardId: string; freeze: boolean; error: string}>,
    ) {
      state.loading = false;
      state.error = action.payload.error;
      // Revert the optimistic update on failure
      state.cards = state.cards.map(card =>
        card.id === action.payload.cardId
          ? {...card, isCardFrozen: !action.payload.freeze}
          : card,
      );
    },

    addDailyLimitRequest(
      state,
      _action: PayloadAction<{cardId: string; limit: number}>,
    ) {
      state.loading = true;
      state.error = null;
    },
    addDailyLimitSuccess(state, _action: PayloadAction<Card>) {
      state.loading = false;
    },
    addDailyLimitFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    removeDailyLimitRequest(state, _action: PayloadAction<{cardId: string}>) {
      state.loading = true;
      state.error = null;
    },
    removeDailyLimitSuccess(state, _action: PayloadAction<Card>) {
      state.loading = false;

    },
    removeDailyLimitFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewCardRequest(state, _action: PayloadAction<{cardName: string}>) {
      state.loading = true;
      state.error = null;
    },
    addNewCardSuccess(state, _action: PayloadAction<Card>) {
      state.loading = false;
      //state.cards = [...state.cards, action.payload];
    },
    addNewCardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  topUpBalanceRequest,
  topUpBalanceSuccess,
  topUpBalanceFailure,
  freezeCardRequest,
  freezeCardSuccess,
  freezeCardFailure,
  addDailyLimitRequest,
  addDailyLimitSuccess,
  addDailyLimitFailure,
  removeDailyLimitRequest,
  removeDailyLimitSuccess,
  removeDailyLimitFailure,
  addNewCardRequest,
  addNewCardSuccess,
  addNewCardFailure,
} = cardsSlice.actions;

export default cardsSlice.reducer;
