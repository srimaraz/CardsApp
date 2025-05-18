import React from 'react';
import { render } from '@testing-library/react-native';
import {
  Bold2432,
  Medium1420,
  Bold1216,
  Bold2230,
  Demi1420,
  Demi1216,
  Demi1620,
  Regular1318,
} from '../Texts';
import { COLORS } from '@constants/colors';

describe('Text Components', () => {
  const testCases = [
    {
      name: 'Bold2432',
      Component: Bold2432,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Bold',
        fontSize: 24,
        lineHeight: 32,
        color: COLORS.white,
        letterSpacing: 0.4,
      },
    },
    {
      name: 'Medium1420',
      Component: Medium1420,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Demi',
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.textSecondary,
      },
    },
    {
      name: 'Bold1216',
      Component: Bold1216,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Bold',
        fontSize: 12,
        lineHeight: 16,
        color: COLORS.white,
      },
    },
    {
      name: 'Bold2230',
      Component: Bold2230,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Bold',
        fontSize: 22,
        lineHeight: 30,
        color: COLORS.white,
        letterSpacing: 0.3,
      },
    },
    {
      name: 'Demi1420',
      Component: Demi1420,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Demi',
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.white,
      },
    },
    {
      name: 'Demi1216',
      Component: Demi1216,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Demi',
        fontSize: 12,
        lineHeight: 16,
        color: COLORS.white,
      },
    },
    {
      name: 'Demi1620',
      Component: Demi1620,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Demi',
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.white,
      },
    },
    {
      name: 'Regular1318',
      Component: Regular1318,
      expectedStyle: {
        fontFamily: 'AvenirNextCyr-Regular',
        fontSize: 13,
        lineHeight: 18,
        color: COLORS.white,
      },
    },
  ];

  testCases.forEach(({ name, Component, expectedStyle }) => {
    describe(name, () => {
      it('renders correctly with default styles', () => {
        const { getByText } = render(<Component>Test Text</Component>);
        const text = getByText('Test Text');
        expect(text.props.style).toContainEqual(expectedStyle);
      });

      it('applies custom styles', () => {
        const customStyle = { color: 'red' };
        const { getByText } = render(
          <Component style={customStyle}>Test Text</Component>
        );
        const text = getByText('Test Text');
        expect(text.props.style).toContainEqual(customStyle);
      });

      it('passes through additional props', () => {
        const { getByText } = render(
          <Component testID="test-text">Test Text</Component>
        );
        const text = getByText('Test Text');
        expect(text.props.testID).toBe('test-text');
      });
    });
  });
}); 