/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';

import SFeature from '../screens/wf_feature/SFeature';
import SFeatureResult from '../screens/wf_feature/SFeatureResult';
import ItemDetails from '../screens/home/ItemDetails';
const Stack = createStackNavigator();

const FeatureNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SFeature"
      name="SFeature"
      options={{headerLeft: null}}
      component={SFeature}>
      <Stack.Screen
        name="SFeature"
        component={SFeature}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SFeatureResult"
        component={SFeatureResult}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SFeatureResultDetails"
        component={ItemDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default FeatureNavigator;
