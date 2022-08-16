/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Index from '../screens/Index';
import ConfirmPassword from '../screens/ConfirmPassword';
import PasswordRecovery from '../screens/PasswordRecovery';
import ItemDetails from './../screens/home/ItemDetails';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      name="Login"
      options={{headerLeft: null}}
      component={Login}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Index"
        component={Index}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecovery}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};
const ItemStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      name="Login"
      options={{headerLeft: null}}
      component={Login}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Details" component={ItemDetails} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, ItemStackNavigator};
