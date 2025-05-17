import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '@screens/ProfileScreen';
import { DEFAULT_STACK_CONFIG } from '@navigation/config/stackConfig';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator {...DEFAULT_STACK_CONFIG}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
}; 