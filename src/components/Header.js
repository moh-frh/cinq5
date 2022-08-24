/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import {COLORS, icons, SIZES} from '../assets/constants';
import I18n from '../i18n';

import Logo from '../assets/images/logo2.png';

const Header = ({search, avatar_uri, onChangeText, onPress}) => {
  return (
    <ImageBackground
      source={{
        uri: 'https://previews.123rf.com/images/catarchangel/catarchangel1506/catarchangel150600488/41410425-sketch-of-foods-utensils-and-kitchen-equipment-hand-drawn-vector-illustration.jpg',
      }}
      // resizeMode="cover"
      imageStyle={{opacity: 0.3}}
      style={{width: '100%'}}>
      <View style={styles.headerContainer}>
        <View style={{width: '10%'}}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={icons.list}
              resizeMode="contain"
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>

        {search === 'null' ? (
          <View style={{width: '70%'}}></View>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.search}
              value={search}
              placeholder={I18n.t('search')}
              onChangeText={onChangeText}
            />
          </View>
        )}

        <View style={{width: '13%'}}>
          <TouchableOpacity
            style={{
              borderStyle: 'solid',
              borderColor: colors.orange,
              borderRadius: 50,
              borderWidth: 1,
            }}>
            {avatar_uri === 'logo_of_app' ? (
              <Image
                style={styles.headerImageProfile}
                source={Logo}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{
                  // uri: API_URL + `/storage/images/avatars/${avatar}`,
                  //   uri: 'https://previews.123rf.com/images/dubova/dubova1502/dubova150200153/37009481-selfie-portrait-de-jeune-homme-ext%C3%A9rieur.jpg',
                  uri: avatar_uri,
                }}
                resizeMode="cover"
                style={styles.headerImageProfile}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3%',
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
  search: {
    fontSize: 20,
  },
  headerImageProfile: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    paddingRight: SIZES.padding * 5,
  },
});

export default Header;
