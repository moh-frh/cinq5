/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = props => {
  const {loading} = props;
  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator animating={loading} size="small" color={'grey'} /> */}
          <LottieView
            source={require('../assets/lottie/loader.json')}
            autoPlay={true}
            loop={true}
            speed={0.5}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    height: 600,
    width: 600,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default Loader;
