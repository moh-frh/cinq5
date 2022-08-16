/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, Image,
  ImageBackground, SafeAreaView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import emptyRecipes from '@app/assets/images/no-food.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '@app/assets/colors/colors';
import { COLORS, FONTS, icons, SIZES } from '@app/assets/constants';
import API_URL from '@app/env';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '@app/components/Header';

const SFeatureResult = ({route, navigation}) => {
  const {ingredients} = route.params;

  const [Entrees, setEntrees] = useState([]);
  const [Drinks, setDrinks] = useState([]);
  const [Aperitif, setAperitif] = useState([]);
  const [Bases, setBases] = useState([]);
  const [Desserts, setDesserts] = useState([]);
  const [Dishes, setDishes] = useState([]);

  const [ResultCount, setResultCount] = useState(0);

  const [avatar, setAvatar] = useState();

  // console.warn('ing :' + ingredients);

  useEffect(() => {
    AsyncStorage.getItem('user_logged_id').then(response => {
      // const user_id = JSON.parse(response);
      const user_id = response;
      axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
        // console.log(response_user.data);
        setAvatar(response_user.data.avatar);
      });
    });

    axios.get(API_URL + `/smart/search/${ingredients}`).then(recipes => {
      setEntrees(recipes.data[0]);
      setDrinks(recipes.data[1]);
      setAperitif(recipes.data[2]);
      setBases(recipes.data[3]);
      setDesserts(recipes.data[4]);
      setDishes(recipes.data[5]);

      setResultCount(
        recipes.data[0].recipes.length +
          recipes.data[1].recipes.length +
          recipes.data[2].recipes.length +
          recipes.data[3].recipes.length +
          recipes.data[4].recipes.length +
          recipes.data[5].recipes.length,
      );
    });
  }, []);

  const renderHeaderResult = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          borderColor: colors.orange,
          borderWidth: 0.5,
          margin: 10,
          borderRadius: 10,
        }}>
        <View style={{width: '30%'}}>
          <LottieView
            source={require('../../assets/lottie/congrats.json')}
            autoPlay={true}
            loop={true}
            speed={0.5}
          />
        </View>
        <View
          style={{width: '70%', flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: colors.darkGrey}}>you can make</Text>
          <Text style={{color: colors.darkGrey}}>{ResultCount}</Text>
          <Text style={{color: colors.darkGrey}}>Recipes</Text>
        </View>
      </View>
    );
  };

  const renderRecipesResult = () => {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{marginRight: 10, width: 350}}
        onPress={() =>
          navigation.navigate('SFeatureResultDetails', {
            itemId: item.id,
          })
        }>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}>
          <Image
            source={{
              uri: `${API_URL}/storage/images/recipes/${item.cover}`,
            }}
            resizeMode="cover"
            style={styles.itemImage}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: colors.orange,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={styles.itemDurationText}>{item.delay} mins</Text>
          </View>
        </View>

        {/* food Info */}
        <Text>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
          }}>
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.body3}}>{item.rate}</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            <Image
              source={icons.user}
              style={{
                height: 20,
                width: 20,
                tintColor: colors.orange,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.nbr_persons}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    const renderLoader = () => {
      return (
        <View style={{marginVertical: 50}}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      );
    };

    return (
      <SafeAreaView
        style={{
          // height: '50%',
          marginBottom: '50%',
          // backgroundColor: colors.white,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView>
          <View>
            {Entrees?.recipes?.length +
              Drinks?.recipes?.length +
              Aperitif?.recipes?.length +
              Bases?.recipes?.length +
              Desserts?.recipes?.length +
              Dishes?.recipes?.length ===
            0 ? (
              <View
                style={{
                  height: '50%',
                  marginBottom: '50%',
                  // backgroundColor: colors.white,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 150, height: 150, margin: '20%'}}
                  source={emptyRecipes}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    lineHeight: 33,
                    fontFamily: 'Lato-Italic',

                    color: colors.black,
                  }}>
                  Empty Result
                </Text>
                <Text style={{color: colors.darkGrey}}>
                  You don't have any recipe that match with your ingredients
                </Text>
              </View>
            ) : (
              <ScrollView style={{marginBottom: 60}}>
                <View style={{marginLeft: 15, marginBottom: 15}}>
                  {Entrees && Entrees.recipes && (
                    <Text style={{...FONTS.body1, color: colors.orange}}>
                      {Entrees.name} ( {Entrees.recipes.length} )
                    </Text>
                  )}
                  <FlatList
                    data={Entrees.recipes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // ListFooterComponent={renderLoader}
                  />
                </View>
                <View style={{marginLeft: 15, marginBottom: 15}}>
                  {Drinks && Drinks.recipes && (
                    <Text style={{...FONTS.body1, color: colors.orange}}>
                      {Drinks.name} ( {Drinks.recipes.length} )
                    </Text>
                  )}
                  <FlatList
                    data={Drinks.recipes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal
                    // ListFooterComponent={renderLoader}
                  />
                </View>
                <View style={{marginLeft: 15, marginBottom: 15}}>
                  {Aperitif && Aperitif.recipes && (
                    <Text style={{...FONTS.body1, color: colors.orange}}>
                      {Aperitif.name} ( {Aperitif.recipes.length} )
                    </Text>
                  )}
                  <FlatList
                    data={Aperitif.recipes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal
                    // ListFooterComponent={renderLoader}
                  />
                </View>
                <View style={{marginLeft: 15, marginBottom: 15}}>
                  {Bases && Bases.recipes && (
                    <Text style={{...FONTS.body1, color: colors.orange}}>
                      {Bases.name} ( {Bases.recipes.length} )
                    </Text>
                  )}
                  <FlatList
                    data={Bases.recipes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal
                    // ListFooterComponent={renderLoader}
                  />
                </View>
                <View style={{marginLeft: 15, marginBottom: 15}}>
                  {Desserts && Desserts.recipes && (
                    <Text style={{...FONTS.body1, color: colors.orange}}>
                      {Desserts.name} ( {Desserts.recipes.length} )
                    </Text>
                  )}
                  <FlatList
                    data={Desserts.recipes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal
                    // ListFooterComponent={renderLoader}
                  />
                </View>
                <View style={{marginLeft: 15, marginBottom: 15}}>
                  {Dishes && Dishes.recipes && (
                    <Text style={{...FONTS.body1, color: colors.orange}}>
                      {Dishes.name} ( {Dishes.recipes.length} )
                    </Text>
                  )}
                  <FlatList
                    data={Dishes.recipes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    horizontal
                    // ListFooterComponent={renderLoader}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        }}
        style={{width: '100%', height: '100%'}}
        imageStyle={{opacity: 0.1}}>
        <Header
          search="null"
          onChangeText={() => {}}
          onPress={() => navigation.openDrawer()}
          avatar_uri={API_URL + `/storage/images/${avatar}`}
        />
        {renderHeaderResult()}
        {renderRecipesResult()}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
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
    backgroundColor: 'transparent',
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
  categoryImageConatiner: {
    width: 30,
    height: 30,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  itemDurationText: {color: COLORS.white, fontWeight: 'bold'},
});

export default SFeatureResult;
