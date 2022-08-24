/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {CommonActions} from '@react-navigation/native';
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
  TouchableOpacity,
  View,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {SIZES} from '@app/assets/constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import I18n from '@app/i18n';

import {
  faGlobeAfrica,
  faMailBulk,
  faUser,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {API_URL} from '../../env';

import axios from 'axios';

import colors from '../../assets/colors/colors';
import ButtonSubmit from '../../components/ButtonSubmit';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import Header from '../../components/Header';

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState('');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [sex, setSex] = useState();
  const [avatar, setAvatar] = useState();

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedSex, setUpdatedSex] = useState(sex);

  const sheetRef = React.useRef(0);

  useEffect(() => {
    sheetRef.current.snapTo(2);
    AsyncStorage.getItem('user_logged_id').then(response => {
      setUser(response);
      const user_id = response;
      axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
        setName(response_user.data.name);
        setEmail(response_user.data.email);
        setSex(response_user.data.sexe);
        setAvatar(response_user.data.avatar);
        setUpdatedName(response_user.data.name);
        setUpdatedEmail(response_user.data.email);
        setUpdatedSex(response_user.data.sexe);
      });
    });
  }, []);

  const onModalSave = () => {
    AsyncStorage.getItem('user_logged_id').then(response => {
      // const user_id = JSON.parse(response);
      const user_id = response;
      axios
        .get(API_URL + '/csrf_token')
        .then(response => {
          let token = response.data;
          axios({
            method: 'patch',
            url:
              API_URL +
              '/update?id=' +
              user_id +
              '&name=' +
              updatedName +
              '&email=' +
              updatedEmail +
              '&sexe=' +
              updatedSex +
              '&_token=' +
              token,
            headers: {
              accept: 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(function (response) {
              sheetRef.current.snapTo(2);

              setName(updatedName);
              setEmail(updatedEmail);
              setSex(updatedSex);

              setModalVisible(!modalVisible);
            })
            .catch(function (response) {
              console.log(response);
            });
        })
        .catch(err => console.log(err));
    });
  };

  const renderContent = () => (
    <View style={{backgroundColor: 'white'}}>
      <ImageBackground
        source={{
          uri: 'https://previews.123rf.com/images/catarchangel/catarchangel1506/catarchangel150600488/41410425-sketch-of-foods-utensils-and-kitchen-equipment-hand-drawn-vector-illustration.jpg',
        }}
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
              {I18n.t('update_information')}
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {I18n.t('name')} :
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={event => setUpdatedName(event)}
                  value={updatedName}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {I18n.t('email')} :
                </Text>

                <TextInput
                  style={styles.input}
                  onChangeText={event => setUpdatedEmail(event)}
                  value={updatedEmail}
                  // keyboardType="numeric"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {I18n.t('gender')} :
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
                  <Picker
                    selectedValue={updatedSex}
                    onValueChange={event => setUpdatedSex(event)}>
                    <Picker.Item label={I18n.t('male')} value="F" />
                    <Picker.Item label={I18n.t('female')} value="M" />
                  </Picker>
                </View>
              </View>
            </SafeAreaView>
          </View>

          <View style={styles.buttonsSubmits}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={() => sheetRef.current.snapTo(2)}>
              <Text style={styles.cancelBtnTxt}>{I18n.t('cancel')}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.saveBtn]}
              onPress={() => onModalSave()}>
              <Text style={styles.saveBtnTxt}>{I18n.t('save')}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
  const renderModalHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandler} />
      </View>
    </View>
  );

  return (
    <View style={styles.drawer}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        }}
        style={{width: '100%', height: '100%'}}
        imageStyle={{opacity: 0.5}}>
        <Header
          search="null"
          onChangeText={() => {}}
          onPress={() => navigation.openDrawer()}
          avatar_uri={
            user === null
              ? 'logo_of_app'
              : API_URL + `/storage/images/avatars/${avatar}`
          }
        />

        <BottomSheet
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          renderHeader={renderModalHeader}
          renderContent={renderContent}
          initialSnap={1}
          enabledGestureInteraction={true}
        />
        {user === null ? (
          <>
            <View style={styles.cardHeader}>
              <Text
                style={styles.cardTitle}
                styles={{justifyContent: 'center'}}>
                you are not logged
              </Text>
            </View>
            <ButtonSubmit
              title={I18n.t('login')}
              onClick={() => navigation.navigate('Login')}
            />
          </>
        ) : (
          <>
            <View style={styles.cardHeader}>
              <Image
                source={{uri: API_URL + `/storage/images/avatars/${avatar}`}}
                style={styles.drawerImage}
              />
              <View style={styles.cardInfo}>
                {name && <Text style={styles.cardTitle}>{name}</Text>}

                <Text style={styles.cardEmail}>{email}</Text>
                {/* <Text style={styles.cardPhone}>not-used-yet</Text> */}
              </View>
            </View>
            <View style={styles.cardTabsList}>
              <TouchableOpacity style={styles.cardTabs}>
                <FontAwesomeIcon
                  icon={faUser}
                  size={30}
                  style={styles.cardTabsIcons}
                />
                <Text style={styles.cardTitle}>{name}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cardTabs}>
                <FontAwesomeIcon
                  icon={faMailBulk}
                  size={30}
                  style={styles.cardTabsIcons}
                />
                {email === 'null' ? (
                  <Text style={styles.cardTitle}>
                    {I18n.t('email_not_set')}
                  </Text>
                ) : (
                  <Text style={styles.cardTitle}>{email}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardTabs}>
                <FontAwesomeIcon
                  icon={faGlobeAfrica}
                  size={30}
                  style={styles.cardTabsIcons}
                />
                <Text style={styles.cardTitle}>Algeria</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardTabs}>
                <FontAwesomeIcon
                  icon={faVenusMars}
                  size={30}
                  style={styles.cardTabsIcons}
                />
                {sex === 'null' ? (
                  <Text style={styles.cardTitle}>{I18n.t('sexe_not_set')}</Text>
                ) : sex === 'M' ? (
                  <Text style={styles.cardTitle}>Male</Text>
                ) : (
                  <Text style={styles.cardTitle}>Female</Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  height: '40%',
                  marginBottom: '-60%',
                }}>
                <Pressable
                  style={styles.buttonSubmit}
                  onPress={() => sheetRef.current.snapTo(0)}>
                  <Text style={styles.textSubmit}>{I18n.t('update')}</Text>
                </Pressable>
              </View>
            </View>
            <ButtonSubmit
              title={I18n.t('logout')}
              onClick={() =>
                Alert.alert(
                  I18n.t('confirm_logout'),
                  I18n.t('confirm_logout_description'),
                  [
                    {
                      text: I18n.t('no'),
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: I18n.t('yes'),
                      onPress: () => {
                        const resetAction = CommonActions.reset({
                          index: 0,
                          routes: [{name: 'Login'}],
                        });
                        navigation.dispatch(resetAction);

                        AsyncStorage.removeItem('user_logged_id').then(res =>
                          navigation.navigate('Login'),
                        );
                      },
                    },
                  ],
                )
              }
            />
          </>
        )}
        <></>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  drawer: {
    flexDirection: 'column',
    backgroundColor: colors.grey,
    height: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.8)',

    borderRadius: 20,
    margin: 10,
    padding: 15,
  },
  cardTabsList: {
    flexDirection: 'column',

    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  cardInfo: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
  },
  cardEmail: {
    fontSize: 15,
    color: colors.darkGrey,
    borderStyle: 'solid',
    borderColor: colors.orange,
    borderBottomWidth: 1,
  },
  cardPhone: {
    fontSize: 15,
    color: colors.darkGrey,
  },
  drawerImage: {
    width: 80,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.orange,
    marginRight: '5%',
  },
  cardTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 7,
    paddingBottom: 10,

    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: colors.orange,
  },
  cardTabsIcons: {
    marginRight: 40,
    color: colors.orange,
  },

  // :::::::::::::::::::::::::::::::::: modal :::::::::::::::::::::::::::::::::::::::
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    padding: 35,
    width: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: colors.grey,
    width: '100%',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.orange,
    padding: 10,
  },
  buttonsSubmits: {
    margin: 30,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: colors.orange,
    color: colors.darkGrey,
    borderRadius: 30,
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  saveBtnTxt: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 20,
  },
  cancelBtn: {
    // backgroundColor: colors.white,
    width: '50%',
    padding: 10,
  },
  cancelBtnTxt: {
    color: colors.darkGrey,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  // custom model :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  header: {
    backgroundColor: colors.orange,
    borderColor: colors.black,
    shadowColor: '#123212',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandler: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  headerDrawer: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: 'center',
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  //:::::::::::: update btn
  buttonSubmit: {
    height: '30%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.darkGrey,
    color: colors.darkGrey,
    borderRadius: 30,
  },
  textSubmit: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
  },
});

export default Profile;
