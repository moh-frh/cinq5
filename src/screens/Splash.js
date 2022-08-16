/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import BackPicture from '../assets/images/backPic.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const [userID, setuserID] = useState();

  const getUserLoggedId = async () => {
    let isUserLogged = await AsyncStorage.getItem('user_logged_id');
    setuserID(isUserLogged);
  };

  useEffect(() => {
    getUserLoggedId();
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <ImageBackground
        source={BackPicture}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            width: 300,
            height: 300,
            borderRadius: 300 / 2,
          }}>
          <LottieView
            source={require('../assets/lottie/splash.json')}
            autoPlay
            loop={false}
            speed={1}
            onAnimationFinish={() =>
              userID != null
                ? navigation.navigate('IndexDrawer')
                : // navigation.dispatch(
                  //     navigation.replace('IndexDrawer', {
                  //       user: 'jane',
                  //     }),
                  //   )
                  navigation.navigate('Login')
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
