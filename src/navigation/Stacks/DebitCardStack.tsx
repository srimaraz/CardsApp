import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DebitCardScreen from '@screens/DebitCardScreen';
import SpendingLimitScreen from '@screens/SpendingLimitScreen';
import {
  DEFAULT_STACK_CONFIG,
  DEBIT_ROUTES,
} from '@navigation/config/stackConfig';

const Stack = createNativeStackNavigator();

export const DebitCardStack = () => {
  return (
    <Stack.Navigator {...DEFAULT_STACK_CONFIG}>
      <Stack.Screen
        name={DEBIT_ROUTES.DEBIT_CARD_MAIN_SCREEN}
        component={DebitCardScreen}
      />
      <Stack.Screen
        name={DEBIT_ROUTES.SPENDING_LIMIT_SCREEN}
        component={SpendingLimitScreen}
      />
    </Stack.Navigator>
  );
};
