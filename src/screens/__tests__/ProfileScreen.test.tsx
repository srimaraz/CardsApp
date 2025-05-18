import React from 'react';
import { render } from '@testing-library/react-native';
import { ProfileScreen } from '../ProfileScreen';
import { APP_TEXTS } from '@constants/appTexts';

describe('ProfileScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText(APP_TEXTS.PROFILE_SCREEN)).toBeTruthy();
  });
}); 