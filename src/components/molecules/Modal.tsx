import React, { ReactNode, useEffect } from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableWithoutFeedback, BackHandler } from 'react-native';

let currentModalClose: (() => void) | null = null;

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  useEffect(() => {
    if (visible) {
      if (currentModalClose && currentModalClose !== onClose) {
        currentModalClose(); // Hide any other open modal
      }
      currentModalClose = onClose;
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onClose();
        return true;
      });
      return () => {
        backHandler.remove();
        if (currentModalClose === onClose) currentModalClose = null;
      };
    }
  }, [visible, onClose]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.centered} pointerEvents="box-none">
        {children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
}); 