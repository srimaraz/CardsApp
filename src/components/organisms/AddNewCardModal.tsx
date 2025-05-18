import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomSheetModal} from '@components/molecules/BottomSheetModal';
import Input from '@components/atoms/Input';
import RoundedButton from '@components/atoms/RoundedButton';
import {COLORS} from '@constants/colors';
import {SCREEN_HEIGHT} from '@constants/common';
import { Bold2230 } from '@components/atoms/Texts';
import { APP_TEXTS } from '@constants/appTexts';

interface AddNewCardModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (cardName: string) => void;
}

export const AddNewCardModal: React.FC<AddNewCardModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!cardName.trim()) {
      setError(APP_TEXTS.ADD_NEW_CARD_ERROR);
      return;
    }
    setError('');
    onAdd(cardName.trim());
    setCardName('');
    onClose();
  };

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      height={SCREEN_HEIGHT * 0.3}>
      <Bold2230 style={styles.title}>{APP_TEXTS.ADD_NEW_CARD_TITLE}</Bold2230>
      <Input
        value={cardName}
        onChangeText={text => {
          setCardName(text);
          setError('');
        }}
        placeholder={APP_TEXTS.ADD_NEW_CARD_PLACEHOLDER}
        error={error}
        style={styles.input}
      />
      <View style={styles.saveBtnWrapper}>
        <RoundedButton
          title={APP_TEXTS.ADD_NEW_CARD_BUTTON}
          onPress={handleAdd}
          disabled={!cardName.trim()}
        />
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.textPrimary,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  saveBtnWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 44,
  },
});
