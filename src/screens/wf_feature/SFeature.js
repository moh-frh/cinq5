/* eslint-disable prettier/prettier */
import colors from '@app/assets/colors/colors';
import {SIZES} from '@app/assets/constants';
import {xorBy} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';

import I18n from '@app/i18n';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '@app/screens/Loader';

import {API_URL} from '@app/env';
import axios from 'axios';

import Header from '@app/components/Header';

const SFeature = ({navigation}) => {
  const [user, setUser] = useState('');
  const [fruitsAndLegumes, setFruitsAndLegumes] = useState([]);
  const [liquids, setLiquids] = useState([]);
  const [mealsAndFish, setMealsAndFish] = useState([]);
  const [others, setOthers] = useState([]);

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    //::::::: get avatar :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    AsyncStorage.getItem('user_logged_id').then(response => {
      setUser(response);
      const user_id = response;
      axios.get(API_URL + `/user/profile/${user_id}`).then(response_user => {
        console.log(response_user.data);
        setAvatar(response_user.data.avatar);
      });
    });
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    axios.get(API_URL + `/ingredients/categories/ALL`).then(categIng1 => {
      setFruitsAndLegumes(categIng1.data[0]);
      setLiquids(categIng1.data[1]);
      setMealsAndFish(categIng1.data[2]);
      setOthers(categIng1.data[3]);
    });
  }, []);

  const [selectedTeamsFruitsAndLegumes, setSelectedTeamsFruitsAndLegumes] =
    useState([]);
  function onMultiChangeFruitsAndLegumes() {
    return item =>
      setSelectedTeamsFruitsAndLegumes(
        xorBy(selectedTeamsFruitsAndLegumes, [item], 'id'),
      );
  }
  const [selectedTeamsLiquids, setSelectedTeamsLiquids] = useState([]);
  function onMultiChangeLiquids() {
    return item =>
      setSelectedTeamsLiquids(xorBy(selectedTeamsLiquids, [item], 'id'));
  }

  const [selectedTeamsMealsAndFish, setSelectedTeamsMealsAndFish] = useState(
    [],
  );
  function onMultiChangeMealsAndFish() {
    return item =>
      setSelectedTeamsMealsAndFish(
        xorBy(selectedTeamsMealsAndFish, [item], 'id'),
      );
  }

  const [selectedTeamsOthers, setSelectedTeamsOthers] = useState([]);
  function onMultiChangeOthers() {
    return item =>
      setSelectedTeamsOthers(xorBy(selectedTeamsOthers, [item], 'id'));
  }

  const loadRecipes = () => {
    setloading(true);

    let ingredients = selectedTeamsFruitsAndLegumes
      .concat(selectedTeamsLiquids)
      .concat(selectedTeamsMealsAndFish)
      .concat(selectedTeamsOthers);

    let ing_id = '';
    ingredients.map(
      elem => (ing_id = ing_id.concat(JSON.stringify(elem.id) + ',')),
    );

    console.warn(ing_id);
    setTimeout(() => {
      setloading(false);
      navigation.navigate('SFeatureResult', {ingredients: ing_id});
    }, 1000);
  };

  const [loading, setloading] = useState(false);

  return (
    <View>
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
        <Loader loading={loading} />

        <View style={{height: '100%'}}>
          <View style={{height: '10%', width: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
              {I18n.t('select_ingredients_text')}
            </Text>
          </View>
          <SafeAreaView style={{height: '60%'}}>
            {/* <ScrollView> */}
            <View style={{margin: 10, marginBottom: 50}}>
              {fruitsAndLegumes.ingredients && (
                <View style={styles.selectBoxContainer}>
                  <SelectBox
                    label={fruitsAndLegumes?.name + '🍎🥝🍒🍓🍅🍆🥕'}
                    labelStyle={styles.label}
                    stye={{color: colors.orange}}
                    options={JSON.parse(
                      JSON.stringify(fruitsAndLegumes.ingredients),
                    )}
                    selectedValues={selectedTeamsFruitsAndLegumes}
                    onMultiSelect={onMultiChangeFruitsAndLegumes()}
                    onTapClose={onMultiChangeFruitsAndLegumes()}
                    isMulti
                  />
                </View>
              )}
              {liquids.ingredients && (
                <View style={styles.selectBoxContainer}>
                  <SelectBox
                    label={liquids?.name + '☕️🍵🥃🍷🍸🥤🥂'}
                    labelStyle={styles.label}
                    style={{color: colors.orange}}
                    options={JSON.parse(JSON.stringify(liquids.ingredients))}
                    selectedValues={selectedTeamsLiquids}
                    onMultiSelect={onMultiChangeLiquids()}
                    onTapClose={onMultiChangeLiquids()}
                    isMulti
                  />
                </View>
              )}

              {mealsAndFish.ingredients && (
                <View style={styles.selectBoxContainer}>
                  <SelectBox
                    label={mealsAndFish?.name + '🍗🍖🥩🦐🦀'}
                    labelStyle={styles.label}
                    style={{color: colors.orange}}
                    options={JSON.parse(
                      JSON.stringify(mealsAndFish.ingredients),
                    )}
                    selectedValues={selectedTeamsMealsAndFish}
                    onMultiSelect={onMultiChangeMealsAndFish()}
                    onTapClose={onMultiChangeMealsAndFish()}
                    isMulti
                  />
                </View>
              )}
              {others.ingredients && (
                <View style={styles.selectBoxContainer}>
                  <SelectBox
                    label={others?.name + '🥚🍳🧀🍼🍄🐚🍚🍙🥜'}
                    labelStyle={styles.label}
                    style={{color: colors.orange}}
                    options={JSON.parse(JSON.stringify(others.ingredients))}
                    selectedValues={selectedTeamsOthers}
                    onMultiSelect={onMultiChangeOthers()}
                    onTapClose={onMultiChangeOthers()}
                    isMulti
                  />
                </View>
              )}
            </View>
            {/* </ScrollView> */}
          </SafeAreaView>
          <View style={{height: '30%', padding: '5%'}}>
            <View style={{alignItems: 'center'}}>
              <Pressable
                style={styles.buttonSubmit}
                onPress={() => loadRecipes()}>
                <Text style={styles.textSubmit}>
                  {I18n.t('launch_feature')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ingSelectBox: {
    marginBottom: 40,
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
  selectBoxContainer: {
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 10,
    borderColor: colors.lightOrange,
    borderWidth: 1,
    borderRadius: 20,
  },
  label: {fontWeight: 'bold', fontSize: 20, color: colors.orange},
  //::::::::::::::: button submit
  buttonSubmit: {
    height: '50%',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.orange,
    color: colors.darkGrey,
    borderRadius: 30,
  },
  textSubmit: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
  },
  //:::::::::::::::::::::::::::::
});

export default SFeature;
