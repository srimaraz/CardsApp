import React from 'react';
import { render } from '@testing-library/react-native';
import { BalanceDisplay } from '../BalanceDisplay';
import { APP_TEXTS } from '@constants/appTexts';

describe('BalanceDisplay', () => {
  it('renders correctly with default balance', () => {
    const { getByText } = render(<BalanceDisplay />);
    
    expect(getByText(APP_TEXTS.AVAILABLE_BALANCE)).toBeTruthy();
    expect(getByText(APP_TEXTS.CURRENCY)).toBeTruthy();
    expect(getByText('0.00')).toBeTruthy();
  });

  it('renders correctly with custom balance', () => {
    const { getByText } = render(<BalanceDisplay balance={1234.56} />);
    
    expect(getByText(APP_TEXTS.AVAILABLE_BALANCE)).toBeTruthy();
    expect(getByText(APP_TEXTS.CURRENCY)).toBeTruthy();
    expect(getByText('1234.56')).toBeTruthy();
  });

  it('formats balance with two decimal places', () => {
    const { getByText } = render(<BalanceDisplay balance={100} />);
    expect(getByText('100.00')).toBeTruthy();
  });

  it('handles zero balance', () => {
    const { getByText } = render(<BalanceDisplay balance={0} />);
    expect(getByText('0.00')).toBeTruthy();
  });

  it('handles negative balance', () => {
    const { getByText } = render(<BalanceDisplay balance={-123.45} />);
    expect(getByText('-123.45')).toBeTruthy();
  });
}); 