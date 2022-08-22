/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Header from '@app/components/Header';

import I18n from '@app/i18n';

import {SwipeListView} from 'react-native-swipe-list-view';

import colors from '@app/assets/colors/colors';
import {COLORS, icons, SIZES} from '@app/assets/constants';
import {API_URL} from '@app/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import HistoryImage from '@app/assets/images/history.png';

const renderItem = (data, rowMap) => {
  return (
    <View style={styles.rowFront}>
      <TouchableHighlight style={styles.rowFrontVisible}>
        <View style={{flexDirection: 'row', padding: '1%'}}>
          <View style={{width: '30%'}}>
            <Image
              source={{
                uri: API_URL + `/storage/images/recipes/${data.item.image}`,
              }}
              style={{height: 90, borderRadius: 10}}
            />
          </View>
          <View style={{flexDirection: 'column', padding: '1%', width: '60%'}}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {data.item.recipe.name}
              </Text>
            </View>

            <View>
              <Text style={styles.description} numberOfLines={1}>
                {data.item.recipe.description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.star}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                    marginLeft: 5,
                  }}
                />
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {data.item.recipe.rate}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={icons.user}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: colors.orange,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {data.item.recipe.nbr_persons}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={icons.clock}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: colors.orange,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: colors.darkGrey,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {data.item.recipe.delay} min
                </Text>
              </View>
            </View>
          </View>

          <View style={{width: '10%', justifyContent: 'flex-end'}}>
            <Image
              source={{
                uri: API_URL + `/storage/images/recipes/${data.item.image}`,
              }}
              style={{
                width: 40,
                height: 25,
                borderRadius: 5,
                justifyContent: 'flex-end',
              }}
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
const History = ({navigation}) => {
  const [user, setUser] = useState('');
  const [history, setHistory] = useState([]);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    AsyncStorage.getItem('user_logged_id').then(response => {
      setUser(response);
      const user_id = response;
      axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
        setAvatar(response_user.data.avatar);
      });
      axios
        .get(`${API_URL}/user/${user_id}/history`)
        .then(response_favourite => {
          setHistory(response_favourite.data);
        });
    });

    // AsyncStorage.getItem('user_logged_id').then(user_id => {
    //   let userId = JSON.parse(user_id);
    // });
  }, [history]);
  return (
    <View>
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
      {history.length === 0 ? (
        <View
          style={{
            height: '100%',
            paddingBottom: '50%',
            backgroundColor: colors.white,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 150, height: 150, margin: 10}}
            source={HistoryImage}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              lineHeight: 33,
              fontFamily: 'Lato-Italic',

              color: colors.black,
            }}>
            {I18n.t('no_history_text')}
          </Text>
          <Text style={{color: colors.darkGrey}}>
            {I18n.t('no_history_description')}
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
            }}
            style={{width: '100%', height: '100%'}}
            imageStyle={{opacity: 0.2}}>
            <View
              style={{
                height: '20%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image style={{width: 150, height: 150}} source={HistoryImage} />
            </View>
            <View
              style={{
                height: '80%',
                marginBottom: '60%',
                backgroundColor: colors.white,
              }}>
              <SwipeListView
                data={history}
                renderItem={renderItem}
                leftOpenValue={100}
                rightOpenValue={-150}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 100,
    margin: 5,
    marginBottom: 15,
    shadowColor: colors.orange,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

    borderStyle: 'solid',
    borderColor: colors.orange,
    borderBottomWidth: 2,
    borderWidth: 0.5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    // height: 60,
    // padding: 10,
    // marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.grey,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: colors.darkGrey,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: colors.orange,
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  description: {
    marginLeft: 5,
    width: '85%',
    height: '40%',
    color: colors.darkGrey,
    fontSize: 15,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  headerContainer: {flexDirection: 'row', height: 50, marginVertical: 10},
  headerDrawer: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: 'center',
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    width: '63%',
    // height: '100%',
    backgroundColor: COLORS.lightGray3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    marginHorizontal: 20,
  },
  headerImageProfile: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    paddingRight: SIZES.padding * 5,
  },
});

export default History;
