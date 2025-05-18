import React from 'react';
import { render } from '@testing-library/react-native';
import { DebitCard } from '../DebitCard';
import { COLORS } from '@constants/colors';

const mockCard = {
  id: '1',
  metaData: {
    cardName: 'Test Card',
    cardNumber: '1234 5678 9012 3456',
    expiry: '12/25',
    cvv: '123',
    cardType: 'VISA',
    cardBrand: 'VISA',
    cardIssuer: 'Aspire',
    cardIssuerLogo: 'aspire',
    cardIssuerColor: '#01D167',
    cardIssuerTextColor: '#FFFFFF',
  },
  cardBalance: 5000,
  isCardFrozen: false,
  isWeeklyLimitEnabled: false,
  spentBalance: 0,
  weeklyLimit: undefined,
};

describe('DebitCard', () => {
  it('renders correctly with card number hidden', () => {
    const { getByText, queryByText } = render(
      <DebitCard card={mockCard} isCardNumberVisible={false} />
    );

    // Check if card name is rendered
    expect(getByText('Test Card')).toBeTruthy();

    // Check if expiry is rendered
    expect(getByText('Thru: 12/25')).toBeTruthy();

    // Check if CVV is masked
    expect(getByText('CVV:')).toBeTruthy();
    expect(getByText('***')).toBeTruthy();

    // Check if last 4 digits are visible
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('6')).toBeTruthy();
  });

  it('renders correctly with card number visible', () => {
    const { getByText } = render(
      <DebitCard card={mockCard} isCardNumberVisible={true} />
    );

    // Check if full card number is visible
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('6')).toBeTruthy();
    expect(getByText('7')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
    expect(getByText('9')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
  });

  it('applies frozen card style when card is frozen', () => {
    const frozenCard = { ...mockCard, isCardFrozen: true };
    const { getByTestId } = render(
      <DebitCard card={frozenCard} isCardNumberVisible={false} />
    );

    const cardContainer = getByTestId('debit-card-container');
    expect(cardContainer.props.style).toContainEqual({
      backgroundColor: COLORS.inactive,
    });
  });
}); 