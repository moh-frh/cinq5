/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from '@app/assets/colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  myBgColor,
  myBorderColor,
  width,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {backgroundColor: myBgColor, width: width, borderColor: myBorderColor},
      ]}
      {...rest}>
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={btnType}
          style={styles.icon}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    flexDirection: 'row',
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  iconWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.grey,
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
});
