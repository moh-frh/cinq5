/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable} from 'react-native';
import colors from '../assets/colors/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowAltCircleRight,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL from '../env';

const PasswordRecovery = ({navigation}) => {
  const getCodeConfirmation = () => {
    axios.get(API_URL + `/recovery/${email}`).then(res => {
      setInputConfirmCode(true);
      console.warn(res);
    });
  };
  const confirmCode = () => {
    axios.get(API_URL + '/csrf_token').then(csrf => {
      let token = csrf.data;
      axios({
        method: 'post',
        url:
          // /login?name=mohamed&token=mohamed2&email=mohamed@wassfast.dz&sexe=M&_token=M1Q0tbRi5CWHyXUE7NUZlo3y1wb8gmsD4M9QkEoy&social=LC
          API_URL +
          `/password/recovery/step/1?email=${email}&code=${code}&_token=${token}`,
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
        },
      }).then(res => {
        setInputNewPassword(true);
      });
    });
  };
  const setNewPassword = () => {
    axios.get(API_URL + '/csrf_token').then(csrf => {
      let token = csrf.data;
      axios({
        method: 'post',
        url:
          API_URL +
          `/password/recovery/step/2?email=${email}&code=${code}&_token=${token}&newpwd=${newPass}`,
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
        },
      }).then(res => {
        console.warn(res);
        navigation.navigate('Index');
      });
    });
  };
  const [inputConfirmCode, setInputConfirmCode] = useState(false);
  const [inputNewPassword, setInputNewPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPass, setNewPass] = useState('');
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
      <Image
        style={{width: '50%', height: '50%'}}
        source={{
          uri: 'https://icon-library.com/images/reset-password-icon/reset-password-icon-29.jpg',
        }}
        resizeMode="cover"
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          margin: 10,
        }}>
        <TextInput
          style={{
            borderRadius: 10,
            borderWidth: 1,
            width: '50%',
            borderColor: colors.orange,
            padding: 10,
          }}
          placeholder="enter your email"
          value={email}
          onChangeText={input => setEmail(input)}
          editable={!inputConfirmCode}
        />
        {!inputConfirmCode && (
          <Pressable onPress={() => getCodeConfirmation()}>
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              size={30}
              style={{
                marginLeft: 5,
                color: colors.orange,
              }}
            />
          </Pressable>
        )}
      </View>

      {inputConfirmCode && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            margin: 10,
          }}>
          <TextInput
            style={{
              borderRadius: 10,
              borderWidth: 1,
              width: '50%',
              borderColor: colors.orange,
              padding: 10,
            }}
            placeholder="enter code"
            value={code}
            onChangeText={input => setCode(input)}
            editable={!inputNewPassword}
          />
          {!inputNewPassword && (
            <Pressable onPress={() => confirmCode()}>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                size={30}
                style={{
                  marginLeft: 5,
                  color: colors.orange,
                }}
              />
            </Pressable>
          )}
        </View>
      )}

      {inputNewPassword && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            margin: 10,
          }}>
          <TextInput
            style={{
              borderRadius: 10,
              borderWidth: 1,
              width: '50%',
              borderColor: colors.orange,
              padding: 10,
            }}
            placeholder="enter new password"
            value={newPass}
            onChangeText={input => setNewPass(input)}
          />
          <Pressable onPress={() => setNewPassword()}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={30}
              style={{
                marginLeft: 5,
                color: colors.orange,
              }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PasswordRecovery;
