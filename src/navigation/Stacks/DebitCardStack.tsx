import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DebitCardScreen } from '@screens/DebitCardScreen';
import { DEFAULT_STACK_CONFIG } from '@navigation/config/stackConfig';

const Stack = createNativeStackNavigator();

export const DebitCardStack = () => {
  return (
    <Stack.Navigator {...DEFAULT_STACK_CONFIG}>
      <Stack.Screen name="DebitCardMain" component={DebitCardScreen} />
    </Stack.Navigator>
  );
}; 