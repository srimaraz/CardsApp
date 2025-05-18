import React from 'react';
import { render } from '@testing-library/react-native';
import { PaymentsScreen } from '../PaymentsScreen';
import { APP_TEXTS } from '@constants/appTexts';

describe('PaymentsScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PaymentsScreen />);
    expect(getByText(APP_TEXTS.PAYMENTS_SCREEN)).toBeTruthy();
  });
}); 