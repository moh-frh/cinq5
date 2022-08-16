/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../assets/colors/colors';

const FoodItem = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.foodItem}
      // onPress={() => navigation.navigate('ItemDetails', {item: item})}
    >
      <Image style={styles.foodImage} source={item.image} />
      <Text style={styles.foodTitle}>{item.title}</Text>
      <Text style={styles.foodRating}>rating: {item.rating}</Text>
      <Text style={styles.foodTime}>Time : {item.deliveryTime}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 195,
    width: 220,
    backgroundColor: colors.white,
    borderRadius: 30,
    shadowColor: '#393939',
    marginTop: 70,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 30,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  foodImage: {
    backgroundColor: colors.darkGrey,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginTop: -80,
  },

  foodTitle: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 22,
  },
  foodRating: {},
  foodTime: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default FoodItem;
