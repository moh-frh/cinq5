/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';

import ItemDetails from '../screens/home/ItemDetails'
import Favourite from '../screens/favourite/Favourite';
const Stack = createStackNavigator();

const FavoriteNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favourite"
      name="Favourite"
      options={{headerLeft: null}}
      component={Favourite}>
      <Stack.Screen
        name="Favourite"
        component={Favourite}
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

export default FavoriteNavigator;
