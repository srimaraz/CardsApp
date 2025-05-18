import React from 'react';
import {View, Text} from 'react-native';
import { APP_TEXTS } from '@constants/appTexts';

export const PaymentsScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{APP_TEXTS.PAYMENTS_SCREEN}</Text>
  </View>
); 