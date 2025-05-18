import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';
import { APP_TEXTS } from '@constants/appTexts';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(APP_TEXTS.HOME_SCREEN)).toBeTruthy();
  });
}); 