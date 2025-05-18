import { Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SPACING = {
  XX_SMALL: 4,
  X_SMALL: 8,
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 24,
  X_LARGE: 32,
  XX_LARGE: 40,
};

export const QUICK_LIMITS = [5000, 10000, 20000];
export const CURRENCY = 'S$';
