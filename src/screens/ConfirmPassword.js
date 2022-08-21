/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import colors from '@app/assets/colors/colors';
import LogoPassConfirm from '@app/assets/icons/LogoPassConfirm.png';
import API_URL from '@app/env';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

const ConfirmPassword = ({route, navigation}) => {
  const {user_id} = route.params;
  console.warn(user_id);
  // console.warn(route);
  const [confirmCode, setConfirmCode] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        source={{
          uri: 'https://previews.123rf.com/images/catarchangel/catarchangel1506/catarchangel150600488/41410425-sketch-of-foods-utensils-and-kitchen-equipment-hand-drawn-vector-illustration.jpg',
        }}
        imageStyle={{opacity: 0.1, borderRadius: 30}}
        resizeMode="cover"
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: '50%', width: '50%'}}
          source={LogoPassConfirm}
          resizeMode="contain"
        />
        <TextInput
          style={{
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          placeholder="type the received code"
          value={confirmCode}
          onChangeText={event => setConfirmCode(event)}
        />
        <View style={{width: '50%', margin: 10, justifyContent: 'center'}}>
          <Pressable
            style={{
              backgroundColor: colors.orange,
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              margin: 5,
            }}
            onPress={() =>
              axios
                .get(API_URL + `/verify/${confirmCode}-${user_id}`)
                // do if/else of res.status
                .then(res => navigation.navigate('Index'))
            }>
            <Text style={{color: colors.white}}>Send</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: colors.orange,
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{color: colors.white}}>
              Continue without verifying
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ConfirmPassword;
