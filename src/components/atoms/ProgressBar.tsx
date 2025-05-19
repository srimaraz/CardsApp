import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';

interface ProgressBarProps {
  percent: number; // 0 to 1
  barColor: string;
  bgColor: string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  slantWidth?: number; // width of the slant
}

export const ProgressBar = React.memo<ProgressBarProps>(({
  percent,
  barColor,
  bgColor,
  height = 16,
  borderRadius = 12,
  style,
  slantWidth = 16,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  const fillWidth = useMemo(() => 
    containerWidth * Math.min(percent, 1)
  , [percent, containerWidth]);

  const containerStyle = useMemo(() => [
    styles.bg,
    {
      backgroundColor: bgColor,
      height,
      borderRadius,
    },
    style,
  ], [bgColor, height, borderRadius, style]);

  const fillBarStyle = useMemo(() => [
    styles.fillBar,
    {
      backgroundColor: barColor,
      width: fillWidth,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    },
  ], [barColor, fillWidth, borderRadius]);

  const slantStyle = useMemo(() => 
    fillWidth > 0 && fillWidth < containerWidth ? [
      styles.slant,
      {
        backgroundColor: barColor,
        left: fillWidth - slantWidth / 2,
        width: slantWidth,
      },
    ] : null
  , [fillWidth, containerWidth, barColor, slantWidth]);

  return (
    <View
      testID="progress-bar"
      style={containerStyle}
      onLayout={onLayout}
    >
      {/* Filled bar */}
      <View
        testID="progress-bar-fill"
        style={fillBarStyle}
      />
      {/* Slant */}
      {slantStyle && (
        <View
          testID="progress-bar-slant"
          style={slantStyle}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  fillBar: {
    height: '100%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  slant: {
    position: 'absolute',
    height: '100%',
    transform: [{ skewX: '-20deg' }],
  },
}); 