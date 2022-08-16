/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from './../router/TabNavigator';
import { MainStackNavigator } from './StackNavigator';

import History from '../screens/history/History';
import Profile from '../screens/profile/Profile';

import DrawerContent from '../screens/DrawerContent';
import Splash from './../screens/Splash';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_logged_id').then(response => {
      // const user_id = JSON.parse(response);
      // console.warn('user_id: ' + response);
      response === null ? setIsLogged(false) : setIsLogged(true);
      // axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
      // });
    });
  }, []);

  // return isLogged ? (
  //   <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
  //     <Drawer.Screen name="Splash" component={Splash} />
  //     {/* <Drawer.Screen name="Login" component={MainStackNavigator} /> */}
  //     <Drawer.Screen name="IndexDrawer" component={TabNavigator} />
  //     <Drawer.Screen name="Profile" component={Profile} />
  //     <Drawer.Screen name="History" component={History} />
  //   </Drawer.Navigator>
  // ) : (
    return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} backBehavior='IndexDrawer'>
      <Drawer.Screen name="Splash" component={Splash} />
      <Drawer.Screen name="Login" component={MainStackNavigator} />
      <Drawer.Screen name="IndexDrawer" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
