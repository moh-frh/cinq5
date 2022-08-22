/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import I18n from '../i18n';

import BottomSheet from 'reanimated-bottom-sheet';

import Animated from 'react-native-reanimated';

import SelectDropdown from 'react-native-select-dropdown';

import {
  faDonate,
  faInfoCircle,
  faLanguage,
  faQuestionCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import colors from '../assets/colors/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {API_URL} from '../env';

const DrawerContent = ({navigation}) => {
  const languages = ['fr', 'ar', 'en'];

  const sheetRef = React.useRef(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [user, setUser] = useState({});

  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    sheetRef.current.snapTo(2);

    AsyncStorage.getItem('user_logged_id').then(response => {
      if (response !== null) {
        axios.get(API_URL + `/user/profile/${response}`).then(res => {
          console.log(res.data);
          setUser(res.data);
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('language').then(res => {
      setLanguage(res);
    });
  }, [language]);

  const selectedItem = {
    title: 'Selected item title',
    description: 'Secondary long descriptive text ...',
  };

  const renderModalHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandler} />
      </View>
    </View>
  );

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
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.orange,
              }}>
              Select Your Language
            </Text>

            <SelectDropdown
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: colors.orange,
              }}
              buttonTextStyle={{fontWeight: 'bold', color: colors.darkGrey}}
              data={languages}
              defaultButtonText={language}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem);
                try {
                  AsyncStorage.setItem('language', selectedItem);
                } catch (e) {}
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://previews.123rf.com/images/catarchangel/catarchangel1506/catarchangel150600488/41410425-sketch-of-foods-utensils-and-kitchen-equipment-hand-drawn-vector-illustration.jpg',
      }}
      // resizeMode="cover"
      imageStyle={{opacity: 0.4}}
      style={{width: '100%'}}>
      <View style={styles.drawer}>
        <View style={styles.cardHeader}>
          <Image
            source={{
              uri: API_URL + `/storage/images/${user?.avatar}`,
            }}
            style={styles.drawerImage}
          />
          <View style={styles.cardInfo}>
            {user && user.name && (
              <Text style={styles.cardTitle}>{user?.name}</Text>
            )}
            {user &&
              user.email &&
              (user.email === 'null' ? (
                <Text style={styles.cardEmail}>email not set</Text>
              ) : (
                <Text style={styles.cardEmail}>{user?.email}</Text>
              ))}

            {/* <Text style={styles.cardPhone}>0123456789</Text> */}
          </View>
        </View>

        <View style={styles.cardTabsList}>
          {/* <TouchableOpacity
            style={styles.cardTabs}
            onPress={() => sheetRef.current.snapTo(3)}>
            <FontAwesomeIcon
              icon={faLanguage}
              size={30}
              style={styles.cardTabsIcons}
            />
            <Text style={styles.cardTitle}>{I18n.t('button_change_language')}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.cardTabs}
            onPress={() => navigation.navigate('IndexDrawer')}>
            <FontAwesomeIcon
              icon={faDonate}
              size={30}
              style={styles.cardTabsIcons}
            />
            <Text style={styles.cardTitle}>{I18n.t('button_donate')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardTabs}
            onPress={() => navigation.navigate('IndexDrawer')}>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size={30}
              style={styles.cardTabsIcons}
            />
            <Text style={styles.cardTitle}>
              {I18n.t('button_help_and_feedback')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardTabs}
            onPress={() => navigation.navigate('History')}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size={30}
              style={styles.cardTabsIcons}
            />
            <Text style={styles.cardTitle}>{I18n.t('button_about_us')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardTabs}
            onPress={() => navigation.navigate('History')}>
            <FontAwesomeIcon
              icon={faLanguage}
              size={30}
              style={styles.cardTabsIcons}
            />
            <Pressable
              style={styles.buttonSubmit}
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
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  lineHeight: 21,
                  color: colors.black,
                }}>
                {I18n.t('button_change_language')}
              </Text>
            </Pressable>
          </TouchableOpacity>
        </View>

        <View style={styles.cardHeader}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size={30}
            style={styles.cardTabsIcons}
          />

          <Pressable
            style={styles.buttonSubmit}
            onPress={() =>
              Alert.alert('Confirm Logout ?', 'Are You Sure To Logout', [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'yes',
                  onPress: () => {
                    navigation.navigate('Login');
                    AsyncStorage.removeItem('user_logged_id').then(res => {
                      console.log(res);
                    });
                    console.log('********************** logout ');
                  },
                },
              ])
            }>
            <Text style={styles.cardTitle}>{I18n.t('button_logout')}</Text>
          </Pressable>

          {/* <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Language Selection',
                'Multi language support',
                [
                  {
                    text: 'French',
                    onPress: () => {
                      I18n.locale = 'fr-Us';
                      // setLanguage({changeLanguage: 'English'});
                    },
                  },
                  {
                    text: 'English',
                    onPress: () => {
                      I18n.locale = 'en-Us';
                      // setLanguage({changeLanguage: 'English'});
                    },
                  },
                  {
                    text: 'Arabic',
                    onPress: () => {
                      I18n.locale = 'ar-Us';
                      // setLanguage({changeLanguage: 'arabic'});
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
            <Text>Click Change Language</Text>
          </TouchableOpacity> */}

          {/* <View>
            <Button title="Show modal" onPress={toggleModal} />
          </View> */}
        </View>

        {/* </ImageBackground> */}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 200, 0]}
        renderHeader={renderModalHeader}
        renderContent={renderContent}
        initialSnap={1}
        enabledGestureInteraction={true}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  drawer: {
    flexDirection: 'column',
    // backgroundColor: colors.grey,
    paddingTop: '10%',
    height: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.orange,
    backgroundColor: 'rgba(255,255,255,0.9)',

    borderRadius: 20,
    margin: 10,
    padding: 15,
  },
  cardTabsList: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: colors.orange,

    backgroundColor: 'rgba(255,255,255,0.9)',
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
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  cardTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderStyle: 'solid',
    borderColor: colors.orange,
  },
  cardTabsIcons: {
    marginRight: 40,
    color: colors.orange,
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
});

export default DrawerContent;
