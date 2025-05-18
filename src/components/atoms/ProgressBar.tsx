import React, { useState } from 'react';
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

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  barColor,
  bgColor,
  height = 16,
  borderRadius = 12,
  style,
  slantWidth = 16,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const fillPercent = Math.min(percent, 1);
  const fillWidth = containerWidth * fillPercent;

  return (
    <View
      testID="progress-bar"
      style={[
        styles.bg,
        {
          backgroundColor: bgColor,
          height,
          borderRadius,
        },
        style,
      ]}
      onLayout={onLayout}
    >
      {/* Filled bar */}
      <View
        testID="progress-bar-fill"
        style={[
          styles.fillBar,
          {
            backgroundColor: barColor,
            width: fillWidth,
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
          },
        ]}
      />
      {/* Slant */}
      {fillWidth > 0 && fillWidth < containerWidth && (
        <View
          testID="progress-bar-slant"
          style={[
            styles.slant,
            {
              backgroundColor: barColor,
              left: fillWidth - slantWidth / 2,
              width: slantWidth,
            },
          ]}
        />
      )}
    </View>
  );
};

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