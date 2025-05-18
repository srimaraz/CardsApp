import React from 'react';
import {View, Text} from 'react-native';
import { APP_TEXTS } from '@constants/appTexts';

export const ProfileScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{APP_TEXTS.PROFILE_SCREEN}</Text>
  </View>
); 