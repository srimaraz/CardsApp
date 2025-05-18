import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProgressBar } from '../ProgressBar';
import { COLORS } from '@constants/colors';

describe('ProgressBar', () => {
  const defaultProps = {
    percent: 0.5,
    barColor: COLORS.cardGreen,
    bgColor: COLORS.lightGray,
  };

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ProgressBar {...defaultProps} />);
    const progressBar = getByTestId('progress-bar');
    const fillBar = getByTestId('progress-bar-fill');
    
    expect(progressBar).toBeTruthy();
    expect(fillBar).toBeTruthy();
  });

  it('handles layout changes', () => {
    const { getByTestId } = render(<ProgressBar {...defaultProps} />);
    const progressBar = getByTestId('progress-bar');
    
    fireEvent(progressBar, 'layout', {
      nativeEvent: {
        layout: {
          width: 200,
          height: 16,
        },
      },
    });

    const fillBar = getByTestId('progress-bar-fill');
    expect(fillBar).toBeTruthy();
  });

  it('does not show slant when progress is 0%', () => {
    const { queryByTestId } = render(
      <ProgressBar
        {...defaultProps}
        percent={0}
      />
    );
    
    const slant = queryByTestId('progress-bar-slant');
    expect(slant).toBeNull();
  });
}); 