import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {styles} from '@navigation/RootNavigator';

export const useHideTabBar = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (!parent) {
      return;
    }

    parent.setOptions({
      tabBarStyle: {display: 'none'},
    } as BottomTabNavigationOptions);

    return () => {
      parent.setOptions({
        tabBarStyle: styles.tabBar,
      } as BottomTabNavigationOptions);
    };
  }, [navigation]);
};
