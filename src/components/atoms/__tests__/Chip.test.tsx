import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Chip } from '../Chip';
import { COLORS } from '@constants/colors';

describe('Chip Component', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(<Chip label="Test Chip" />);
    expect(getByText('Test Chip')).toBeTruthy();
  });

  it('handles press event when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Chip label="Test Chip" onPress={onPress} />
    );
    fireEvent.press(getByText('Test Chip'));
    expect(onPress).toHaveBeenCalled();
  });

  it('applies default styles', () => {
    const { getByText } = render(<Chip label="Test Chip" />);
    const chip = getByText('Test Chip').parent;
    expect(chip).not.toBeNull();
    expect(chip?.props.style).toEqual([
      expect.objectContaining({
        backgroundColor: COLORS.cardGreen + '1A',
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 8,
      })
    ]);
  });

  it('applies custom container style when provided', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByText } = render(
      <Chip label="Test Chip" style={customStyle} />
    );
    const chip = getByText('Test Chip').parent;
    expect(chip).not.toBeNull();
    expect(chip?.props.style).toEqual([
      expect.objectContaining({
        backgroundColor: COLORS.cardGreen + '1A',
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 8,
      }),
      customStyle
    ]);
  });

  it('applies custom text style when provided', () => {
    const customTextStyle = { color: 'red' };
    const { getByText } = render(
      <Chip label="Test Chip" textStyle={customTextStyle} />
    );
    const text = getByText('Test Chip');
    expect(text.props.style).toEqual([
      expect.objectContaining({
        fontFamily: 'AvenirNextCyr-Demi',
        fontSize: 12,
        lineHeight: 16,
      }),
      expect.arrayContaining([
        expect.objectContaining({
          color: COLORS.cardGreen
        }),
        expect.objectContaining(customTextStyle)
      ])
    ]);
  });

  it('applies default text color', () => {
    const { getByText } = render(<Chip label="Test Chip" />);
    const text = getByText('Test Chip');
    expect(text.props.style).toEqual([
      expect.objectContaining({
        fontFamily: 'AvenirNextCyr-Demi',
        fontSize: 12,
        lineHeight: 16,
      }),
      expect.arrayContaining([
        expect.objectContaining({
          color: COLORS.cardGreen
        })
      ])
    ]);
  });
}); 