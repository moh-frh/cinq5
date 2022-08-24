/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import colors from '@app/assets/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';

import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';

import BottomSheet from 'reanimated-bottom-sheet';

import {FONTS, icons, SIZES} from '@app/assets/constants';
import axios from 'axios';

import LottieView from 'lottie-react-native';

import {API_URL, BO_URL} from '@app/env';
import {Dimensions} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

const renderItem = ({item}) => {
  return (
    <TouchableOpacity
      style={{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        // backgroundColor:
        //   selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.padding,
        // ...styles.shadow,
      }}
      // onPress={() => onSelectCategory(item)}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor:
          //   selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
        }}>
        <Image
          source={{
            uri: BO_URL + `/storage/ingredients/${item.image}`,
            //  API_URL + `/storage/images/ingredients/${item.image}`,
            // uri: 'http://192.168.9.36/selekni-core/public/storage/images/ingredients/${item.image}',
          }}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>

      <Text
        style={{
          color: colors.white,
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          marginTop: SIZES.padding,
          color: colors.black,
        }}>
        ({item.qte}-{item.unit})
      </Text>
    </TouchableOpacity>
  );
};

const ItemDetails = ({route, navigation}) => {
  //---------------------------------------------------------------
  const {width} = Dimensions.get('window');
  const height = width;
  //---------------------------------------------------------------
  const sheetRef = React.useRef(0);
  //---------------------------------------------------------------

  const [selectedItem, setSelectedItem] = useState({});
  const [modalDoneVisible, setModalDoneVisible] = useState(false);

  const {itemId} = route.params;

  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(3);
  const [userId, setUserId] = useState();
  const animation = useRef(null);
  const isFirstRun = useRef(true);

  const [activeDot, setActiveDot] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [fav, setFav] = useState();

  useEffect(() => {
    axios.get(`${API_URL}/fr/recipes/${itemId}`).then(recipe => {
      setSelectedItem(recipe.data[0]);
      setFav(recipe.data[0].fav);
    });
  }, []);

  useEffect(async () => {
    let userId = await AsyncStorage.getItem('user_logged_id');

    userId == null ? setUserId('no user') : setUserId(userId);
  });

  useEffect(() => {
    sheetRef.current.snapTo(2);

    AsyncStorage.getItem('user_logged_id').then(user_id => {
      // let userId = JSON.parse(user_id);
      let userId = user_id;
      setUserId(userId);
      axios
        .get(`${API_URL}/fr/recipes/id/${itemId}?user_id=${userId}`)
        .then(recipe => {
          //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          recipe.data.fav === null || recipe.data.fav === undefined
            ? setIsLiked(false)
            : setIsLiked(true);
          // ---------------------------------------------------
          if (isFirstRun.current) {
            if (isLiked) {
              animation.current.play(43, 43);
            } else {
              animation.current.play(0, 0);
            }
            isFirstRun.current = false;
          } else if (isLiked) {
            animation.current.play(4, 40);
          } else {
            animation.current.play(0, 0);
          }
          //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        });
    });
  }, [itemId, isLiked]);

  const onModalRate = async rating => {
    // console.log('onModalRate: ' + rating);
    setRating(rating);
    // setModalDoneVisible(!modalDoneVisible);
  };

  const handleLikedRecipe = () => {
    isLiked
      ? AsyncStorage.getItem('user_logged_id').then(userId => {
          axios.get(API_URL + '/csrf_token').then(response => {
            let token = response.data;
            axios
              .post(
                `${API_URL}/user/${userId}/favorites/${itemId}/delete?_token=${token}`,
              )
              .then(element => {
                setIsLiked(!isLiked);
              });
          });
        })
      : AsyncStorage.getItem('user_logged_id').then(userId => {
          axios.get(API_URL + '/csrf_token').then(response => {
            let token = response.data;
            // let userId = JSON.parse(responseUser);
            // let userId = responseUser;
            axios
              .post(
                `${API_URL}/user/${userId}/favorites/${itemId}?_token=${token}`,
              )
              .then(element => {
                setIsLiked(!isLiked);
              });
          });
        });
  };

  const addRecipeToHistory = () => {
    // api call
    AsyncStorage.getItem('user_logged_id').then(userId => {
      axios.get(API_URL + '/csrf_token').then(response => {
        let token = response.data;
        // let userId = JSON.parse(responseUser);
        // let userId = responseUser;
        axios
          .post(API_URL + `/user/${userId}/history/${itemId}?_token=${token}`)
          .then(element => {
            setIsLiked(!isLiked);
          });
      });
    });
  };

  const recipeRate = () => {
    userId == 'no user'
      ? (setModalDoneVisible(!modalDoneVisible), sheetRef.current.snapTo(0))
      : (console.warn('rate: ' + rating),
        // api call
        AsyncStorage.getItem('user_logged_id').then(responseUser => {
          axios.get(API_URL + '/csrf_token').then(response => {
            let token = response.data;
            // let userId = JSON.parse(responseUser);
            let userId = responseUser;
            axios
              .post(
                `${API_URL}/fr/recipe/${itemId}/rate/${rating}/${userId}?_token=${token}`,
              )
              .then(element => {
                setIsLiked(!isLiked);
              });
          });
        }),
        setModalDoneVisible(!modalDoneVisible));
  };
  const onModalCancel = () => {
    setModalDoneVisible(!modalDoneVisible);
  };

  const renderHeader = () => {
    return (
      <ImageBackground
        source={{
          uri: 'https://previews.123rf.com/images/catarchangel/catarchangel1506/catarchangel150600488/41410425-sketch-of-foods-utensils-and-kitchen-equipment-hand-drawn-vector-illustration.jpg',
        }}
        // resizeMode="cover"
        imageStyle={{opacity: 0.3}}
        style={{width: '100%'}}>
        <View
          style={{
            paddingVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 30,
            // backgroundColor: colors.white,
          }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                marginRight: 30,
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {selectedItem.name}
          </Text>
        </View>
      </ImageBackground>
      // </View>
    );
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
          <View>
            <LottieView
              style={{width: 150, height: 150}}
              ref={animation}
              source={require('../../assets/lottie/login1.json')}
              autoPlay={true}
              loop={true}
              speed={1}
            />
          </View>
          <View>
            <SafeAreaView style={{flexDirection: 'column', width: '100%'}}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{I18n.t('name')} :</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={event => setUpdatedName(event)}
                  value={updatedName}
                />
              </View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{I18n.t('email')} :</Text>

                <TextInput
                  style={styles.input}
                  onChangeText={event => setUpdatedEmail(event)}
                  value={updatedEmail}
                  // keyboardType="numeric"
                />
              </View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{I18n.t('gender')} :</Text>
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
              </View> */}
            </SafeAreaView>
          </View>

          <View style={styles.buttonsSubmits}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={() => sheetRef.current.snapTo(2)}>
              <Text style={styles.cancelBtnTxt}>cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.saveBtn]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.saveBtnTxt}>Go To Login</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: colors.white}}>
      {renderHeader()}

      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        renderHeader={renderModalHeader}
        renderContent={renderContent}
        initialSnap={1}
        enabledGestureInteraction={true}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDoneVisible}
        onRequestClose={() => {
          setModalDoneVisible(!modalDoneVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.orange,
              }}>
              Rate The Recipe
            </Text>
            <AirbnbRating
              reviews={[
                'not good',
                'Wow',
                'Amazing',
                'Unbelievable',
                'Awesome',
              ]}
              onFinishRating={onModalRate}
            />

            <View style={style.buttonsSubmits}>
              <Pressable
                style={[style.button, style.cancelBtn]}
                onPress={() => onModalCancel()}>
                <Text style={style.cancelBtnTxt}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[style.button, style.saveBtn]}
                onPress={() => recipeRate()}>
                <Text style={style.saveBtnTxt}>Save </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 250,
          }}>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={({nativeEvent}) => {
              const slide = Math.ceil(
                nativeEvent.contentOffset.x /
                  nativeEvent.layoutMeasurement.width,
              );
              if (slide !== activeDot) {
                setActiveDot(slide);
              }
            }}
            style={{width, height, position: 'absolute'}}
            showsHorizontalScrollIndicator={false}>
            {selectedItem &&
              selectedItem.images &&
              selectedItem.images.map((image, index) => {
                return (
                  <Image
                    key={index}
                    source={{
                      uri:
                        BO_URL +
                        `/storage/recipes/${selectedItem.images[index]}`,
                    }}
                    style={{
                      width,
                      height,
                      resizeMode: 'cover',
                      paddingBottom: 20,
                    }}
                  />
                );
              })}
          </ScrollView>
          <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
            {selectedItem &&
              selectedItem.images &&
              selectedItem.images.map((imageDot, index) => {
                return (
                  <Text
                    key={index}
                    style={
                      index === activeDot
                        ? [style.dotActiveColor, {margin: 5}]
                        : [style.dotColor, {margin: 5}]
                    }>
                    ⬤
                  </Text>
                );
              })}
          </View>
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: '80%',
                fontSize: 25,
                fontWeight: 'bold',
                color: colors.white,
              }}>
              {selectedItem.name}
            </Text>

            {/* <View> */}

            {userId == 'no user' ? (
              <TouchableOpacity
                style={style.iconContainer}
                onPress={() => sheetRef.current.snapTo(0)}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.white,
                    height: 70,
                    width: 70,
                    borderRadius: 70 / 2,
                    marginBottom: 30,
                  }}>
                  <LottieView
                    style={{width: 150, height: 150}}
                    ref={animation}
                    source={require('../../assets/lottie/like.json')}
                    autoPlay={false}
                    loop={false}
                    speed={1}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.iconContainer}
                onPress={() => handleLikedRecipe()}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.white,
                    height: 70,
                    width: 70,
                    borderRadius: 70 / 2,
                    marginBottom: 30,
                  }}>
                  <LottieView
                    style={{width: 150, height: 150}}
                    ref={animation}
                    source={require('../../assets/lottie/like.json')}
                    autoPlay={false}
                    loop={false}
                    speed={1}
                  />
                </View>
              </TouchableOpacity>
            )}
            {/* </View> */}
          </View>

          <Text style={style.detailsText}>{selectedItem.description}</Text>

          <View style={{padding: SIZES.padding * 2}}>
            {selectedItem && selectedItem.ingredients && (
              <Text style={{...FONTS.h1, fontWeight: 'bold'}}>
                Ingredients ({selectedItem.ingredients.length})
              </Text>
            )}

            <FlatList
              data={selectedItem.ingredients}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => `${item.name}`}
              renderItem={renderItem}
              contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
            />
          </View>
          <View style={{padding: SIZES.padding * 2}}>
            <Text style={{...FONTS.h1, fontWeight: 'bold'}}>Steps</Text>

            {/* stepper */}
          </View>

          <View style={{marginBottom: 70, paddingBottom: 40}}>
            {/* // stpeer 2 */}
            <View style={{flex: 1}}>
              {selectedItem && selectedItem.steps && (
                <ProgressSteps
                  completedProgressBarColor={colors.darkGrey}
                  completedStepIconColor={colors.darkGrey}
                  activeLabelColor={colors.white}
                  activeStepNumColor={colors.white}
                  disabledStepNumColor={colors.orange}
                  activeStepIconBorderColor={colors.darkGrey}
                  activeStep={0}>
                  {selectedItem &&
                    selectedItem.steps &&
                    selectedItem.steps.map((element, index) => {
                      return (
                        <ProgressStep
                          onSubmit={() => {
                            setModalDoneVisible(!modalDoneVisible);
                            addRecipeToHistory();
                          }}
                          onNext={() => setActiveStep(activeStep + 1)}
                          finishBtnText="Done"
                          nextBtnTextStyle={{color: '#FFF', fontWeight: 'bold'}}
                          previousBtnTextStyle={{
                            color: colors.darkGrey,
                            fontWeight: 'bold',
                          }}
                          key={index}>
                          <View style={{alignItems: 'center'}} key={element.id}>
                            <Text
                              style={{
                                color: colors.white,
                                fontSize: 20,
                                fontWeight: 'bold',
                              }}>
                              {element.title}
                            </Text>
                            <Text style={{color: colors.white, fontSize: 17}}>
                              {element.description}
                            </Text>
                          </View>
                        </ProgressStep>
                      );
                    })}
                </ProgressSteps>
              )}
            </View>
            {selectedItem.video !== null && (
              <TouchableOpacity activeOpacity={0.8}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.orange,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    watch video
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {backgroundColor: 'transparent'},
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: colors.orange,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: colors.white,
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    marginBottom: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    borderRadius: 20,
    padding: 10,
  },
  // :::::::::::::::::::::::::::::::::: modal :::::::::::::::::::::::::::::::::::::::
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
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
    borderWidth: 0.5,
    borderColor: colors.orange,
    padding: 10,
  },
  buttonsSubmits: {
    marginTop: 30,
    width: '100%',
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
    fontSize: 17,
    lineHeight: 20,
  },
  cancelBtn: {
    backgroundColor: colors.white,
    width: '50%',
    padding: 10,
  },
  cancelBtnTxt: {
    color: colors.darkGrey,
    fontSize: 17,
    lineHeight: 20,
    margin: 'auto',
  },
  dotColor: {
    color: colors.darkGrey,
  },
  dotActiveColor: {
    color: colors.white,
  },
});

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
    width: '90%',
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
    backgroundColor: colors.darkGrey,
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

export default ItemDetails;
