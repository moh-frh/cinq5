/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Button, Pressable, Text, StyleSheet, Modal} from 'react-native';
import colors from '../assets/colors/colors';

const ButtonSubmit = props => {
  return (
    <View style={{marginTop:'5%', alignItems: 'center'}}>
      <Pressable style={styles.buttonSubmit} onPress={() => props.onClick()}>
        <Text style={styles.textSubmit}>{props.title}</Text>
      </Pressable>
    </View>
    );
};


const styles = StyleSheet.create({
  buttonSubmit: {
    height: '30%',
    width: '60%',
    // marginHorizontal: '10%',
    // marginTop: '3%',
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
});

export default ButtonSubmit;
