import {COLORS} from '@constants/colors';
import {StyleSheet, Text, TextProps} from 'react-native';

const FONTS = {
  BOLD: 'AvenirNextCyr-Bold',
  REGULAR: 'AvenirNextCyr-Regular',
  DEM: 'AvenirNextCyr-Demi',
  HEAVY: 'AvenirNextCyr-Heavy',
  MEDIUM: 'AvenirNextCyr-Medium',
  ULTRA_LIGHT: 'AvenirNextCyr-UltraLight',
  THIN: 'AvenirNextCyr-Thin',
};

export const Bold2432 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.bold2432, style]}>
    {children}
  </Text>
);

export const Medium1420 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.medium1420, style]}>
    {children}
  </Text>
);

export const Bold1216 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.bold1216, style]}>
    {children}
  </Text>
);
export const Bold2230 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.bold2232, style]}>
    {children}
  </Text>
);
export const Demi1420 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.demi1420, style]}>
    {children}
  </Text>
);
export const Demi1216 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.demi1216, style]}>
    {children}
  </Text>
);
export const Demi1620 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.demi1622, style]}>
    {children}
  </Text>
);
export const Regular1318 = ({children, style, ...props}: TextProps) => (
  <Text {...props} style={[styles.regular1318, style]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  bold2432: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    lineHeight: 32,
    color: COLORS.white,
    letterSpacing: 0.4,
  },
  medium1420: {
    fontFamily: FONTS.DEM,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  bold1216: {
    fontFamily: FONTS.BOLD,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.white,
  },
  bold2232: {
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  demi1420: {
    fontFamily: FONTS.DEM,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.white,
  },
  demi1216: {
    fontFamily: FONTS.DEM,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.white,
  },
  regular1318: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.white,
  },
  demi1622: {
    fontFamily: FONTS.DEM,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.white,
  },
});
