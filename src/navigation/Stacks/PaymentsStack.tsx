import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentsScreen } from '@screens/PaymentsScreen';
import { DEFAULT_STACK_CONFIG } from '@navigation/config/stackConfig';

const Stack = createNativeStackNavigator();

export const PaymentsStack = () => {
  return (
    <Stack.Navigator {...DEFAULT_STACK_CONFIG}>
      <Stack.Screen name="PaymentsMain" component={PaymentsScreen} />
    </Stack.Navigator>
  );
}; 