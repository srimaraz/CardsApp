import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
