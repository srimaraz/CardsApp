/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {RootNavigator} from '@navigation/RootNavigator';

function App(): React.JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
     
        <RootNavigator />
     
    </NavigationContainer>
  );
}

export default App;
