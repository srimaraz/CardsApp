import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { BottomSheetModal } from '@components/molecules/BottomSheetModal';
import Input from '@components/atoms/Input';
import RoundedButton from '@components/atoms/RoundedButton';
import { COLORS } from '@constants/colors';

interface AddNewCardModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (cardName: string) => void;
}

export const AddNewCardModal: React.FC<AddNewCardModalProps> = ({ visible, onClose, onAdd }) => {
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!cardName.trim()) {
      setError('Card name is required');
      return;
    }
    setError('');
    onAdd(cardName.trim());
    setCardName('');
    onClose();
  };

  return (
    <BottomSheetModal visible={visible} onClose={onClose} height={260}>
      <Text style={styles.title}>Add New Card</Text>
      <Input
        value={cardName}
        onChangeText={text => {
          setCardName(text);
          setError('');
        }}
        placeholder="Card Name"
        error={error}
        style={styles.input}
      />
      <RoundedButton title="Add" onPress={handleAdd} disabled={!cardName.trim()} />
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
}); 