/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../assets/colors/colors';

const FoodTypes = ({item}) => {
  return (
    <TouchableOpacity>
      <Text style={styles.typesElement}> {item.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  typesElement: {
    color: colors.darkGrey,
    margin: 15,
    fontSize: 17,
  },
});
export default FoodTypes;
