import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '@constants/colors';
import {TAB_CONFIG} from './config/tabConfig.ts';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.cardGreen,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBar,
      }}>
      {TAB_CONFIG.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            ...tab.options,
            tabBarIcon: ({color}) => <tab.icon color={color} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: COLORS.cardGreen,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: 4,
    backgroundColor: COLORS.white,
  },
  tabBarLabelStyle: {
    fontSize: 9,
    fontWeight: '500',
  },
});
