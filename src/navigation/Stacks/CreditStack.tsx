import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreditScreen } from '@screens/CreditScreen';
import { DEFAULT_STACK_CONFIG } from '@navigation/config/stackConfig';

const Stack = createNativeStackNavigator();

export const CreditStack = () => {
  return (
    <Stack.Navigator {...DEFAULT_STACK_CONFIG}>
      <Stack.Screen name="CreditMain" component={CreditScreen} />
    </Stack.Navigator>
  );
}; 