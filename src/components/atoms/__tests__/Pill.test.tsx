import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pill } from '../Pill';
import { COLORS } from '@constants/colors';

describe('Pill', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(<Pill label="Test Label" />);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Pill label="Test Label" onPress={onPress} />);
    
    fireEvent.press(getByText('Test Label'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies selected styles when selected', () => {
    const { getByText } = render(<Pill label="Test Label" selected />);
    const text = getByText('Test Label');
    
    expect(text.props.style).toContainEqual({
      color: COLORS.white,
      fontWeight: 'bold',
    });
  });

  it('applies default styles when not selected', () => {
    const { getByText } = render(<Pill label="Test Label" />);
    const text = getByText('Test Label');
    
    expect(text.props.style).toContainEqual({
      color: COLORS.textPrimary,
      fontSize: 15,
    });
  });

  it('does not call onPress when not provided', () => {
    const { getByText } = render(<Pill label="Test Label" />);
    const pill = getByText('Test Label').parent;
    
    if (pill) {
      expect(pill.props.onPress).toBeUndefined();
    }
  });
}); 