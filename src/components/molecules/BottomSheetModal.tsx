import React, { useEffect, useRef, useState } from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableWithoutFeedback, Animated, Easing, Dimensions, BackHandler } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number; // Optional: height of the sheet
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ visible, onClose, children, height = 340 }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const closingRef = useRef(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      closingRef.current = false;
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onClose();
        return true;
      });
      return () => backHandler.remove();
    } else if (isVisible && !closingRef.current) {
      closingRef.current = true;
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        closingRef.current = false;
      });
    }
  }, [visible, onClose, translateY, backdropOpacity, isVisible]);

  if (!isVisible) return null;

  return (
    <RNModal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.sheet,
          {
            height,
            transform: [{ translateY }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
}); 