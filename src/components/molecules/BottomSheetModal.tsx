import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardEvent,
  Platform,
} from 'react-native';
import { COLORS } from '@constants/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number; // Optional: height of the sheet
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  children,
  height = 340,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const closingRef = useRef(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          onClose();
          return true;
        },
      );
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

  if (!isVisible) {
    return null;
  }

  return (
    <RNModal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.sheet,
          {
            height,
            transform: [{translateY}],
            bottom: keyboardHeight,
          },
        ]}>
        {children}
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.modalBackdrop,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
