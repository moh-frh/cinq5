/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home/Home';
import ItemDetails from '../screens/home/ItemDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        name="Home"
        options={{headerLeft: null}}
        component={Home}
        >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{headerShown: false}}
        />
      
      </Stack.Navigator>
  );
};

export default AppNavigator;
