import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '@constants/colors';
import { TAB_CONFIG } from './config/tabConfig.ts';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.cardGreen,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 12,
        },
      }}>
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            ...tab.options,
            tabBarIcon: ({ color }) => <tab.icon color={color} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
