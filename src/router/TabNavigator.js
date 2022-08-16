/* eslint-disable prettier/prettier */
import React from 'react';
import 'react-native-gesture-handler';
import {Animated, Dimensions, View} from 'react-native';
import colors from '../assets/colors/colors';
import {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favourite from '../screens/favourite/Favourite';
import SFeature from '../screens/wf_feature/SFeature';
import FavoriteNavigator from '../router/FavoriteNavigator'
import History from '../screens/history/History';
import Profile from '../screens/profile/Profile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AppNavigator from './AppNavigator';
import FeatureNavigator from './FeatureNavigator';
import {
  faHome,
  faHeart,
  faRocket,
  faHistory,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 10,
          marginHorizontal: 10,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{position: 'absolute', top: 20}}>
              <FontAwesomeIcon
                icon={faHome}
                size={30}
                color={focused ? colors.orange : colors.darkGrey}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="Favourite"
        // component={FavoriteNavigator}
        component={Favourite}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20,
              }}>
              <FontAwesomeIcon
                icon={faHeart}
                size={30}
                color={focused ? colors.orange : colors.darkGrey}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="SFeature"
        component={FeatureNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? {
                      width: 75,
                      height: 75,
                      backgroundColor: colors.orange,
                      borderRadius: 75 / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
                  : {
                      width: 75,
                      height: 75,
                      backgroundColor: colors.white,
                      borderRadius: 75 / 2,
                      borderWidth: 5,
                      borderColor: colors.orange,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
              }>
              <FontAwesomeIcon
                icon={faRocket}
                size={40}
                color={focused ? colors.white : colors.darkGrey}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20,
              }}>
              <FontAwesomeIcon
                icon={faHistory}
                size={30}
                color={focused ? colors.orange : colors.darkGrey}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20,
              }}>
              <FontAwesomeIcon
                icon={faUser}
                size={30}
                color={focused ? colors.orange : colors.darkGrey}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
    </Tab.Navigator>
  );
};

function getWidth() {
  let width = Dimensions.get('window').width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

export default TabNavigator;
