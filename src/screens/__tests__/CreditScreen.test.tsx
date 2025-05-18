import React from 'react';
import { render } from '@testing-library/react-native';
import { CreditScreen } from '../CreditScreen';
import { APP_TEXTS } from '@constants/appTexts';

describe('CreditScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CreditScreen />);
    expect(getByText(APP_TEXTS.CREDIT_SCREEN)).toBeTruthy();
  });
}); 