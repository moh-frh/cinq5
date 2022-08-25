/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';

import Animated from 'react-native-reanimated';

import {faLanguage} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';

import colors from '@app/assets/colors/colors';
import Logo from '@app/assets/images/logo2.png';

import back1 from '@app/assets/images/back1.jpg';
import back2 from '@app/assets/images/back2.jpg';

import I18n from '@app/i18n';

import {API_URL} from '@app/env';
import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import SocialButton from '@app/components/SocialButton';

import OfflineNotice from './OfflineNotice';
const Login = ({navigation}) => {
  const [networkInfo, setnetworkInfo] = useState();

  const sheetRefRegister = React.useRef(0);
  const sheetRefLogin = React.useRef(0);

  useEffect(() => {
    // checkNetwork();

    sheetRefRegister.current.snapTo(2);
    sheetRefLogin.current.snapTo(2);

    // console.warn(networkInfo);
  }, [networkInfo]);

  useEffect(() => {}, []);

  // languages :::::::::::::::::
  const [language, setLanguage] = useState('english');
  //::::::::::::::::::::::::::::
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [sexeLogin, setSexeLogin] = useState('');

  const renderContent = () => (
    <View style={{backgroundColor: 'white'}}>
      <ImageBackground
        source={back2}
        resizeMode="cover"
        imageStyle={{opacity: 0.1}}
        style={{width: '100%'}}>
        <Animated.View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '5%',
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.orange,
              }}>
              {I18n.t('register')}
            </Text>
          </View>
          <View>
            <SafeAreaView style={{flexDirection: 'column', width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Name :</Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="mohamed"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={text => setName(text)}
                  />
                  {/* <Picker
                    selectedValue={updatedSex}
                    onValueChange={event => setUpdatedSex(event)}>
                    <Picker.Item label={I18n.t('male')} value="F" />
                    <Picker.Item label={I18n.t('female')} value="M" />
                  </Picker> */}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Email :</Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="mohamed@gmail.com"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Gender :</Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="F / M"
                    style={styles.textInput}
                    onChangeText={text => setGender(text)}
                  />
                  {/* <Picker
                    selectedValue={updatedSex}
                    onValueChange={event => setUpdatedSex(event)}>
                    <Picker.Item label={I18n.t('male')} value="F" />
                    <Picker.Item label={I18n.t('female')} value="M" />
                  </Picker> */}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Password :
                </Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="********"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={text => setPassword(text)}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>

          <View
            style={{
              margin: 30,
              width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={{width: '50%', padding: 10}}
              onPress={() => sheetRefRegister.current.snapTo(2)}>
              <Text
                style={{
                  color: colors.darkGrey,
                  fontSize: 22,
                  fontWeight: 'bold',
                  lineHeight: 20,
                }}>
                {I18n.t('cancel')}
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.orange,
                color: colors.darkGrey,
                borderRadius: 30,
                width: '50%',
                padding: 10,
                alignItems: 'center',
              }}
              onPress={() =>
                axios.get(API_URL + '/csrf_token').then(csrf => {
                  let token = csrf.data;
                  axios({
                    method: 'post',
                    url:
                      API_URL +
                      `/register?name=${name}&password=${password}&email=${email}&sexe=${gender}&_token=${token}`,
                    headers: {
                      accept: 'application/json',
                      'Accept-Language': 'en-US,en;q=0.8',
                    },
                  })
                    .then(res => {
                      res.status === 201
                        ? (navigation.navigate('ConfirmPassword', {
                            user_id: res.data,
                          }),
                          AsyncStorage.setItem('user_logged_id', res.data))
                        : ToastAndroid.showWithGravityAndOffset(
                            'verify your data !',
                            ToastAndroid.LONG,
                            ToastAndroid.TOP,
                            25,
                            50,
                          );
                    })
                    .catch(function (response) {
                      console.warn('**************** error [register]');
                    });
                })
              }>
              <Text style={{color: colors.white, fontSize: 20, lineHeight: 20}}>
                {I18n.t('register')}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );

  const renderContentLogin = () => (
    <View style={{backgroundColor: 'white'}}>
      <ImageBackground
        source={back2}
        resizeMode="cover"
        imageStyle={{opacity: 0.1}}
        style={{width: '100%'}}>
        <Animated.View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '0%',
          }}>
          <View>
            <SafeAreaView style={{flexDirection: 'column', width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Email :</Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="mohamed@gmail.com"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={text => setEmailLogin(text)}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Password :
                </Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="********"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={text => setPasswordLogin(text)}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sexe :</Text>
                <View
                  style={{
                    height: 40,
                    width: 200,
                    margin: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.orange,
                    // padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    placeholder="male / female"
                    style={styles.textInput}
                    onChangeText={text => setSexeLogin(text)}
                  />
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Pressable
                  onPress={() => navigation.navigate('PasswordRecovery')}>
                  <Text
                    style={{
                      color: colors.orange,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    forgot Password
                  </Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>

          <View
            style={{
              margin: 30,
              width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={{width: '50%', padding: 10}}
              onPress={() => sheetRefLogin.current.snapTo(2)}>
              <Text
                style={{
                  color: colors.darkGrey,
                  fontSize: 22,
                  fontWeight: 'bold',
                  lineHeight: 20,
                }}>
                {I18n.t('cancel')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                axios.get(API_URL + '/csrf_token').then(csrf => {
                  let token = csrf.data;
                  axios({
                    method: 'post',
                    url:
                      API_URL +
                      `/login?token=${passwordLogin}&email=${emailLogin}&sexe=${sexeLogin}&_token=${token}&social=LC`,
                    headers: {
                      accept: 'application/json',
                      'Accept-Language': 'en-US,en;q=0.8',
                    },
                  })
                    .then(res => {
                      JSON.stringify(res.data)
                        ? ToastAndroid.showWithGravityAndOffset(
                            'verify your credentials !',
                            ToastAndroid.LONG,
                            ToastAndroid.TOP,
                            25,
                            50,
                          )
                        : AsyncStorage.setItem(
                            'user_logged_id',
                            res.data.id,
                          ).then(res => navigation.replace('Index'));
                    })
                    .catch(function (response) {
                      console.log(
                        'response **********************************************',
                      );
                    });
                });
              }}
              style={{
                backgroundColor: colors.orange,
                color: colors.darkGrey,
                borderRadius: 30,
                width: '50%',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: colors.white, fontSize: 20, lineHeight: 20}}>
                {I18n.t('login')}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );

  const renderModalHeader = () => (
    <View
      style={{
        backgroundColor: colors.orange,
        borderColor: colors.black,
        shadowColor: '#123212',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
      }}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.white,
            marginBottom: 10,
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRefRegister}
        snapPoints={[520, 300, 0]}
        renderHeader={renderModalHeader}
        renderContent={renderContent}
        initialSnap={1}
        enabledGestureInteraction={true}
      />
      <BottomSheet
        ref={sheetRefLogin}
        snapPoints={[450, 300, 0]}
        renderHeader={renderModalHeader}
        renderContent={renderContentLogin}
        initialSnap={1}
        enabledGestureInteraction={true}
      />

      <View style={styles.containerLogo}>
        {networkInfo && <OfflineNotice />}
        <ImageBackground
          source={back1}
          resizeMode="cover"
          blurRadius={4}
          imageStyle={{opacity: 0.3, borderRadius: 30}}
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={styles.imageLogo} source={Logo} resizeMode="contain" />
        </ImageBackground>
      </View>

      <View style={styles.containerLogin}>
        <View style={{marginBottom: '10%'}}>
          <Text
            style={{
              color: colors.darkGrey,
              fontSize: 25,
              paddingBottom: 20,
              fontWeight: 'bold',
              borderBottomWidth: 1,
              borderBottomColor: colors.lightOrange,
            }}>
            hey, welcome to <Text style={{color: colors.orange}}>`cinq5`</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SocialButton
            buttonTitle={I18n.t('login')}
            btnType="sign-in"
            color={colors.orange}
            myBgColor="#f5e7ea"
            myBorderColor={colors.orange}
            width="40%"
            onPress={() => sheetRefLogin.current.snapTo(0)}
          />
          <Text style={{color: colors.darkGrey}}>or</Text>
          <SocialButton
            buttonTitle={I18n.t('register')}
            btnType="user-circle-o"
            color={colors.orange}
            myBgColor="#f5e7ea"
            myBorderColor={colors.orange}
            width="40%"
            onPress={() => sheetRefRegister.current.snapTo(0)}
          />
        </View>

        <View>
          <SocialButton
            buttonTitle={I18n.t('button_enter_without_login')}
            btnType="home"
            color={colors.orange}
            myBgColor="#f5e7ea"
            myBorderColor={colors.orange}
            width="80%"
            onPress={() => {
              navigation.navigate('Index');
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: colors.orange,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 20,
            padding: 15,
            margin: 5,
          }}>
          <Pressable
            onPress={() => {
              Alert.alert(
                'Language Selection',
                'Multi language support',
                [
                  {
                    text: 'French',
                    onPress: () => {
                      I18n.locale = 'fr-Us';
                      setLanguage({changeLanguage: 'French'});
                      AsyncStorage.setItem('language', 'fr');
                    },
                  },
                  {
                    text: 'English',
                    onPress: () => {
                      I18n.locale = 'en-Us';
                      setLanguage({changeLanguage: 'English'});
                      AsyncStorage.setItem('language', 'en');
                    },
                  },
                  {
                    text: 'Arabic',
                    onPress: () => {
                      I18n.locale = 'ar-Us';
                      setLanguage({changeLanguage: 'arabic'});
                      AsyncStorage.setItem('language', 'ar');
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => {
                      console.log('Cancel Pressed');
                    },
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            }}>
            <FontAwesomeIcon
              icon={faLanguage}
              size={30}
              style={{
                // marginRight: 40,
                color: colors.orange,
              }}
            />
            {/* <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: 21,
                color: colors.black,
              }}>
              {I18n.t('button_change_language')}
            </Text> */}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,

    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  containerLogo: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  containerLogin: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50%',
    paddingTop: '10%',
  },
  imageLogo: {
    height: '80%',
    width: '50%',
  },
  buttonLogin: {
    color: colors.black,
  },
});
export default Login;
