import React from 'react';
import {View, Text} from 'react-native';
import { APP_TEXTS } from '@constants/appTexts';

export const CreditScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{APP_TEXTS.CREDIT_SCREEN}</Text>
  </View>
); 