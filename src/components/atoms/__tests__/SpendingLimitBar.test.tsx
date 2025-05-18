import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { SpendingLimitBar } from '../SpendingLimitBar';
import { COLORS } from '@constants/colors';
import { APP_TEXTS } from '@constants/appTexts';

const MockProgressBar = ({ percent, barColor, bgColor, height, borderRadius }) => (
  <View
    testID="progress-bar"
    style={{
      percent,
      barColor,
      bgColor,
      height,
      borderRadius,
    }}
  />
);

jest.mock('../ProgressBar', () => ({
  ProgressBar: (props) => <MockProgressBar {...props} />,
}));

describe('SpendingLimitBar', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <SpendingLimitBar current={1000} max={5000} />
    );

    expect(getByText(APP_TEXTS.DEBIT_CARD_SPENDING_LIMIT)).toBeTruthy();
    expect(getByText('S$1,000')).toBeTruthy();
    expect(getByText('S$5,000')).toBeTruthy();
  });

  it('renders with custom currency and label', () => {
    const customLabel = 'Custom Label';
    const { getByText } = render(
      <SpendingLimitBar
        current={1000}
        max={5000}
        currency="$"
        label={customLabel}
      />
    );

    expect(getByText(customLabel)).toBeTruthy();
    expect(getByText('$1,000')).toBeTruthy();
    expect(getByText('$5,000')).toBeTruthy();
  });

  it('applies inactive styles when card is frozen', () => {
    const { getByText, getByTestId } = render(
      <SpendingLimitBar
        current={1000}
        max={5000}
        isCardFrozen={true}
      />
    );

    const currentValue = getByText('S$1,000');
    expect(currentValue.props.style).toContainEqual({
      color: COLORS.textSecondary,
    });

    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style.barColor).toBe(COLORS.inactive);
    expect(progressBar.props.style.bgColor).toBe(COLORS.lightGray);
  });

  it('calculates progress percentage correctly', () => {
    const { getByTestId } = render(
      <SpendingLimitBar current={2500} max={5000} />
    );

    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style.percent).toBe(0.5);
  });

  it('caps progress at 100%', () => {
    const { getByTestId } = render(
      <SpendingLimitBar current={6000} max={5000} />
    );

    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style.percent).toBe(1);
  });
}); 