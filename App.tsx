import React from 'react';
import {LogBox, StyleSheet, View} from 'react-native';
import {RootNavigator} from '@navigation/RootNavigator';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import cardsReducer from './src/store/cardsSlice';
import cardsSaga from './src/store/cardsSaga';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from '@constants/colors';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// Create saga middleware
const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

// Configure store with saga middleware
const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

// Run saga
sagaMiddleware.run(cardsSaga);

function App(): React.JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
              <RootNavigator />
            </View>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 12,
  },
  });

export default App;
