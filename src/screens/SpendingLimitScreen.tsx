import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import Input from '@components/atoms/Input';
import RoundedButton from '@components/atoms/RoundedButton';
import {Chip} from '@components/atoms/Chip';
import {COLORS} from '@constants/colors';
import HomeIcon from '@assets/icons/Home';
import {Bold2432, Medium1420, Regular1318} from '@components/atoms/Texts';
import Limit2 from '@assets/icons/Limit2';
import {useNavigation} from '@react-navigation/native';
import {useHideTabBar} from 'src/hooks/useHideTabBar';

const QUICK_LIMITS = [5000, 10000, 20000];
const CURRENCY = 'S$';

const SpendingLimitScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useHideTabBar();

  const validate = () => {
    if (!value) {
      setError('Please enter a limit');
      return false;
    }
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      setError('Enter a valid number');
      return false;
    }
    setError('');
    return true;
  };

  const onSave = () => {
    if (validate()) {
      // Save logic here
      navigation.goBack();
    }
  };

  const onChipPress = (limit: number) => {
    setValue(limit.toString());
    setError('');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLORS.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.backArrow}>{'‹'}</Text>
          </TouchableOpacity>
          <HomeIcon color={COLORS.cardGreen} />
        </View>
        <Bold2432 style={styles.headerTitle}>Spending limit</Bold2432>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 24,
          paddingTop: 32,
          borderRadius: 30,
          marginTop: -30,
        }}>
        <View style={styles.row}>
          {/* Icon can be replaced with your own */}
          <Limit2
            width={20}
            height={20}
            color={COLORS.cardGreen}
            fill={COLORS.cardGreen}
          />
          <Medium1420 style={styles.cardTitle}>
            Set a weekly debit card spending limit
          </Medium1420>
        </View>
        <View style={styles.amountRow}>
          <Chip
            label={CURRENCY}
            style={{
              paddingVertical: 4,
              paddingHorizontal: 12,
              backgroundColor: COLORS.cardGreen,
            }}
            textStyle={{color: COLORS.white}}
          />
          <Input
            value={value}
            onChangeText={text => {
              setValue(text);
              setError('');
            }}
            placeholder=""
            keyboardType="numeric"
            style={styles.amountInput}
            inputStyle={styles.amountInputText}
          />
        </View>
        <View style={styles.divider} />
        <Regular1318 style={styles.desc}>
          Here weekly means the last 7 days - not the calendar week
        </Regular1318>
        <View style={styles.quickRow}>
          {QUICK_LIMITS.map(limit => (
            <Chip
              key={limit}
              label={`S$ ${limit.toLocaleString()}`}
              onPress={() => onChipPress(limit)}
              style={styles.quickChip}
            />
          ))}
        </View>
      </View>
      {/* Save Button */}
      <View style={styles.saveBtnWrapper}>
        <RoundedButton
          title="Save"
          onPress={onSave}
          disabled={!!error || !value}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SpendingLimitScreen;

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingBottom: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: COLORS.white,
    textAlign: 'left',
    marginTop: 16,
  },
  logo: {
    alignSelf: 'flex-end',
  },
  card: {
    backgroundColor: 'red',
    borderRadius: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 8,
  },
  currencyChip: {
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 3,
    fontSize: 16,
    width: 40,
    height: 24,
  },
  amountInput: {
    flex: 1,
    marginLeft: 0,
    justifyContent: 'center',
  },
  amountInputText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'left',
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.inactive,
    marginBottom: 12,
  },
  desc: {
    color: COLORS.textTertiary,
    marginBottom: 18,
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickChip: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: COLORS.cardGreen + '1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 44,
  },
});
