/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '@app/assets/colors/colors';
import {COLORS, FONTS, icons, SIZES} from '@app/assets/constants';
import categoryData from '@app/assets/data/categoryData';
import Header from '@app/components/Header';
import axios from 'axios';

import {API_URL, BO_URL} from '@app/env';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [all_recipes, setAll_recipes] = useState([]);

  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [avatar, setAvatar] = useState();

  const [language, setLanguage] = useState();

  useEffect(() => {
    AsyncStorage.getItem('language').then(lang => {
      setLanguage(lang);
      axios.get(`${API_URL}/${lang}/recipes/ALL`).then(recipes => {
        setAll_recipes(recipes.data);
        setFilteredData(recipes.data);
      });
    });

    AsyncStorage.getItem('user_logged_id').then(response => {
      // const user_id = JSON.parse(response);
      setUser(response);

      const user_id = response;
      axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
        setAvatar(response_user.data.avatar);
      });
    });
  }, [language]);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true,
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const onSearchFoods = text => {
    if (text) {
      const newData = all_recipes.filter(item => {
        const itemData = item.name
          ? item.name.toString().toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(all_recipes);
      setSearch(text);
    }
  };

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  function onSelectCategory(category) {
    //filter recipes by category

    let recipesByCategory;

    category.id === 0
      ? (recipesByCategory = all_recipes)
      : (recipesByCategory = all_recipes.filter(
          item => item.categorie == category.id,
        ));

    setFilteredData(recipesByCategory);

    setSelectedCategory(category);
  }

  const renderRecipeCategories = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={styles.categoryImageConatiner}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  };

  function renderFoodList() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 5}}
        onPress={() =>
          navigation.navigate('ItemDetails', {
            itemId: item.id,
          })
        }>
        {/* Image */}
        <View>
          <Image
            source={{
              uri: BO_URL + `/storage/recipes/${item.images[0]}`,
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

              borderStyle: 'solid',
              borderColor: colors.orange,
              borderWidth: 4,
            }}>
            <Image
              source={icons.clock}
              style={{
                height: 20,
                width: 20,
                tintColor: colors.white,
                marginRight: 10,
              }}
            />
            <Text style={styles.itemDurationText}>{item.delay} mins</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: colors.lightOrange,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: '2%',
          }}>
          <View>
            {item && item.name && (
              <Text style={{...FONTS.body1}}>{item.name}</Text>
            )}
          </View>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Rating */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '5%',
              }}>
              <Image
                source={icons.star}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.primary,
                  marginRight: 10,
                }}
              />
              <Text style={{...FONTS.body2}}>{item.rate}</Text>
            </View>
            {/* nbr persons */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '5%',
              }}>
              <Image
                source={icons.user}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.primary,
                  marginRight: 10,
                }}
              />
              <Text style={{...FONTS.body2}}>{item.nbr_persons}</Text>
            </View>

            {/* nbr persons */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '5%',
              }}>
              <Image
                source={icons.author}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: colors.orange,
                  marginRight: 10,
                }}
              />
              <Text style={{...FONTS.body2}}>{item.author.name}</Text>
            </View>
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
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
        // ListFooterComponent={renderLoader}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        }}
        style={{width: '100%', height: '100%'}}
        imageStyle={{opacity: 0.1}}>
        {/* {renderHeader()} */}
        <Header
          search={search}
          onChangeText={value => onSearchFoods(value)}
          onPress={() => navigation.openDrawer()}
          avatar_uri={
            user === null
              ? 'logo_of_app'
              : API_URL + `/storage/images/avatars/${avatar}`
          }
        />
        {renderRecipeCategories()}
        {renderFoodList()}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1%',
  },
  headerDrawer: {
    paddingLeft: SIZES.padding * 2,
    justifyContent: 'center',
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    width: '70%',
    // height: '100%',
    backgroundColor: COLORS.lightGray3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    // marginHorizontal: '3%',
    borderColor: colors.orange,
    borderWidth: 1,
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

export default Home;
