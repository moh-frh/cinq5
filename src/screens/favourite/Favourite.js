/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import I18n from '@app/i18n';

import Header from '@app/components/Header';

import { SwipeListView } from 'react-native-swipe-list-view';

import colors from '@app/assets/colors/colors';
import { COLORS, icons, SIZES } from '@app/assets/constants';
import API_URL from '@app/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import FavouriteImage from '@app/assets/images/favourite.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: '5%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={icons.star} style={styles.icon} />
                <Text style={styles.iconText}>{data.item.recipe.rate}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image source={icons.user} style={styles.icon} />
                <Text style={styles.iconText}>
                  {data.item.recipe.nbr_persons}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image source={icons.clock} style={styles.icon} />
                <Text style={styles.iconText}>
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
const HiddenItemWithActions = props => {
  return (
    <View style={styles.rowBack}>
      <Text style={{color: colors.darkGrey, width: 200}}>
        {props.data.item.timeAgo}
      </Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={props.closeRow}>
        <FontAwesomeIcon icon={faTimesCircle} size={40} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={props.deleteRow}>
        <FontAwesomeIcon icon={faTrashAlt} size={40} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};
const renderHiddenItem = (data, rowMap) => {
  const closeRow = (rowMap, rowKey) => {
    // console.log('-' + rowKey);
    rowMap[data.item.key].closeRow();
  };
  const deleteRow = (rowMap, rowKey) => {
    // add endpoint for deleting
    // console.log(` delete row : ${rowMap} -  ${rowKey}`);
    axios.get(API_URL + '/csrf_token').then(response => {
      let token = response.data;
      axios
        .delete(`${API_URL}/user/favorites/${rowKey}/delete?_token=${token}`)
        .then(element => {
          console.log('delete success');
        });
    });
  };
  return (
    <HiddenItemWithActions
      data={data}
      rowMap={rowMap}
      closeRow={() => closeRow(rowMap, data.item.id)}
      deleteRow={() => deleteRow(rowMap, data.item.id)}
    />
  );
};

const Favourite = ({navigation}) => {
  const [user, setUser] = useState('');
  const [favourite, setFavourite] = useState([]);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    AsyncStorage.getItem('user_logged_id').then(response => {
      setUser(response);
      const user_id = response;
      axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
        // console.log(response_user.data);
        setAvatar(response_user.data.avatar);
      });
    });

    AsyncStorage.getItem('user_logged_id').then(user_id => {
      AsyncStorage.getItem('language').then(lang => {
        let userId = user_id;
        axios
          .get(`${API_URL}/${lang}/user/${userId}/favorites`)
          .then(response_favorite => {
            // console.warn('fav:', response_favorite)
            setFavourite(response_favorite.data);
          });
      });
    });
  }, [favourite]);
  return (
    <View>
      <Header
        search="null"
        onChangeText={() => {}}
        onPress={() => navigation.openDrawer()}
        avatar_uri={
            user === null
            ? ('logo_of_app')
            : (API_URL + `/storage/images/${avatar}`)
          }  
        
      />
      {favourite.length === 0 ? (
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
            source={FavouriteImage}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              lineHeight: 33,
              fontFamily: 'Lato-Italic',

              color: colors.black,
            }}>
            {I18n.t('no_favorite_text')}
          </Text>
          <Text style={{color: colors.darkGrey}}>
            {I18n.t('no_favorite_description')}
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
                paddingBottom: '50%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 150, height: 150, marginTop: 200}}
                source={FavouriteImage}
              />
            </View>
            <View style={{height: '80%', backgroundColor: colors.white}}>
              <SwipeListView
                data={favourite}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
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
    marginLeft: '5%',
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
  icon: {
    height: 20,
    width: 20,
    tintColor: colors.orange,
    marginRight: 5,
  },

  iconText: {
    color: colors.darkGrey,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Favourite;
