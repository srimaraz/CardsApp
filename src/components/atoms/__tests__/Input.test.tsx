import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../Input';
import { COLORS } from '@constants/colors';

describe('Input Component', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        testID="test-input"
      />
    );
    const input = getByTestId('test-input');
    expect(input).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        testID="test-input"
      />
    );
    const input = getByTestId('test-input');
    fireEvent.changeText(input, 'test');
    expect(mockOnChangeText).toHaveBeenCalledWith('test');
  });

  it('restricts input to numbers when keyboardType is numeric', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        keyboardType="numeric"
        testID="test-input"
      />
    );
    const input = getByTestId('test-input');
    
    // Try to enter non-numeric text
    fireEvent.changeText(input, 'abc');
    expect(mockOnChangeText).not.toHaveBeenCalled();
    
    // Enter numeric text
    fireEvent.changeText(input, '123');
    expect(mockOnChangeText).toHaveBeenCalledWith('123');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        error={errorMessage}
        testID="test-input"
      />
    );
    const error = getByText(errorMessage);
    expect(error).toBeTruthy();
  });

  it('applies error style when error prop is provided', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        error="Error message"
        testID="test-input"
      />
    );
    const input = getByTestId('test-input');
    expect(input.props.style).toContainEqual({ borderColor: 'red' });
  });

  it('applies custom styles when provided', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        inputStyle={customStyle}
        testID="test-input"
      />
    );
    const input = getByTestId('test-input');
    const styles = input.props.style;
    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customStyle)
      ])
    );
  });

  it('displays placeholder text', () => {
    const placeholder = 'Enter text here';
    const { getByPlaceholderText } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder={placeholder}
        testID="test-input"
      />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeTruthy();
  });
}); 