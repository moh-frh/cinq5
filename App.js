/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './src/router/DrawerNavigator';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

function App() {
  useEffect(() => {
    AsyncStorage.getItem('language').then(res => {
      console.warn('language' + res);
      if (res == null) {
        try {
          AsyncStorage.setItem('language', 'fr');
        } catch (e) {}
      }
    });
  });
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
