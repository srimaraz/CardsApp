import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

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
        tabBarStyle: undefined, // or restore your default style here
      } as BottomTabNavigationOptions);
    };
  }, [navigation]);
};
