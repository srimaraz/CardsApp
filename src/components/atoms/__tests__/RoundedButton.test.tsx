import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RoundedButton from '../RoundedButton';
import { COLORS } from '@constants/colors';

describe('RoundedButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title', () => {
    const { getByText } = render(
      <RoundedButton title="Test Button" onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <RoundedButton title="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies disabled style when disabled prop is true', () => {
    const { getByTestId } = render(
      <RoundedButton 
        title="Test Button" 
        onPress={mockOnPress} 
        disabled 
        testID="rounded-button"
      />
    );

    const button = getByTestId('rounded-button');
    expect(button.props.style).toContainEqual({
      backgroundColor: COLORS.inactive,
    });
  });

  it('does not call onPress when disabled', () => {
    const { getByText } = render(
      <RoundedButton title="Test Button" onPress={mockOnPress} disabled />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom style when provided', () => {
    const customStyle = { marginTop: 10 };
    const { getByTestId } = render(
      <RoundedButton 
        title="Test Button" 
        onPress={mockOnPress} 
        style={customStyle}
        testID="rounded-button"
      />
    );

    const button = getByTestId('rounded-button');
    expect(button.props.style).toContainEqual(customStyle);
  });
}); 