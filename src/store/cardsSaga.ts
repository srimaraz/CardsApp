import cardsApi from '@api/cardsApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { cardData } from '../dumyData/cardData';
import {
  addDailyLimitFailure,
  addDailyLimitRequest,
  addNewCardFailure,
  addNewCardRequest,
  fetchCardsFailure,
  fetchCardsRequest, fetchCardsSuccess,
  freezeCardFailure,
  freezeCardRequest,
  removeDailyLimitFailure,
  removeDailyLimitRequest,
  topUpBalanceFailure,
  topUpBalanceRequest, topUpBalanceSuccess
} from './cardsSlice';

function* fetchCardsSaga(): Generator {
  try {
    const cards = yield call(cardsApi.getAllCards);
    if (cards && cards.length > 0) {
      yield put(fetchCardsSuccess(cards));
    } else {
      // If no cards in storage, save dummy data and update state
      yield call(cardsApi.saveCards, cardData);
      yield put(fetchCardsSuccess(cardData));
    }
  } catch (e: any) {
    yield put(fetchCardsFailure(e.message));
  }
}

function* topUpBalanceSaga(action: PayloadAction<{ cardId: string; amount: number }>): Generator {
  try {
    const card = yield call(cardsApi.topUpBalance, action.payload.cardId, action.payload.amount);
    yield put(topUpBalanceSuccess(card));
  } catch (e: any) {
    yield put(topUpBalanceFailure(e.message));
  }
}

function* freezeCardSaga(action: PayloadAction<{ cardId: string; freeze: boolean }>): Generator {
  try {
    console.log('Saga: Starting freeze card saga with action:', action.payload);
    const card = yield call(cardsApi.freezeCard, action.payload.cardId, action.payload.freeze);
    console.log('Saga: Freeze card API call successful, card:', card);
    // Get current state
    const state = yield select((state: any) => state.cards);
    // Update cards array with the new card
    const updatedCards = state.cards.map((c: any) => 
      c.id === card.id ? card : c
    );
    // Dispatch success with updated cards
    yield put(fetchCardsSuccess(updatedCards));
  } catch (e: any) {
    console.log('Saga: Freeze card failed with error:', e.message);
    yield put(freezeCardFailure({cardId: action.payload.cardId, freeze: action.payload.freeze, error: e.message}));
  }
}

function* addDailyLimitSaga(action: PayloadAction<{ cardId: string; limit: number }>): Generator {
  try {
    console.log('Saga: Starting add daily limit saga with action:', action.payload);
    const card = yield call(cardsApi.addDailyLimit, action.payload.cardId, action.payload.limit);
    console.log('Saga: Add daily limit API call successful, card:', card);
    // Get current state
    const state = yield select((state: any) => state.cards);
    // Update cards array with the new card
    const updatedCards = state.cards.map((c: any) => 
      c.id === card.id ? card : c
    );
    // Dispatch success with updated cards
    yield put(fetchCardsSuccess(updatedCards));
  } catch (e: any) {
    console.log('Saga: Add daily limit failed with error:', e.message);
    yield put(addDailyLimitFailure(e.message));
  }
}

function* removeDailyLimitSaga(action: PayloadAction<{ cardId: string }>): Generator {
  try {
    console.log('Saga: Starting remove daily limit saga with action:', action.payload);
    const card = yield call(cardsApi.removeDailyLimit, action.payload.cardId);
    console.log('Saga: Remove daily limit API call successful, card:', card);
    // Get current state
    const state = yield select((state: any) => state.cards);
    // Update cards array with the new card
    const updatedCards = state.cards.map((c: any) => 
      c.id === card.id ? card : c
    );
    // Dispatch success with updated cards
    yield put(fetchCardsSuccess(updatedCards));
  } catch (e: any) {
    console.log('Saga: Remove daily limit failed with error:', e.message);
    yield put(removeDailyLimitFailure(e.message));
  }
}

function* addNewCardSaga(action: PayloadAction<{ cardName: string }>): Generator {
  try {
    console.log('Saga: Starting add new card saga with action:', action.payload);
    const card = yield call(cardsApi.addNewCard, action.payload.cardName);
    console.log('Saga: Add new card API call successful, card:', card);
    // Get current state
    const state = yield select((state: any) => state.cards);
    // Add new card to the array
    const updatedCards = [...state.cards, card];
    // Dispatch success with updated cards
    yield put(fetchCardsSuccess(updatedCards));
  } catch (e: any) {
    console.log('Saga: Add new card failed with error:', e.message);
    yield put(addNewCardFailure(e.message));
  }
}

export default function* cardsSaga(): Generator {
  yield all([
    takeLatest(fetchCardsRequest.type, fetchCardsSaga),
    takeLatest(topUpBalanceRequest.type, topUpBalanceSaga),
    takeLatest(freezeCardRequest.type, freezeCardSaga),
    takeLatest(addDailyLimitRequest.type, addDailyLimitSaga),
    takeLatest(removeDailyLimitRequest.type, removeDailyLimitSaga),
    takeLatest(addNewCardRequest.type, addNewCardSaga),
  ]);
}
