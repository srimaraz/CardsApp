import React from 'react';
import { render } from '@testing-library/react-native';
import DebitCardScreen from '../DebitCardScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  cards: {
    cards: [
      {
        id: '1',
        cardBalance: 1000,
        spentBalance: 200,
        weeklyLimit: 500,
        isWeeklyLimitEnabled: true,
        isCardFrozen: false,
        cardName: 'Test Card',
        cardNumber: '1234567890123456',
        cardHolder: 'John Doe',
        expiry: '12/25',
        cvv: '123',
      },
    ],
  },
};

describe('DebitCardScreen', () => {
  it('renders without crashing and shows card details', () => {
    const store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <DebitCardScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() }} />
      </Provider>
    );
    expect(getByText('Test Card')).toBeTruthy();
  });
}); 