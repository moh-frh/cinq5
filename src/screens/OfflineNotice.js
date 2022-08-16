/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {View, Text, NetInfo, Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}
class OfflineNotice extends PureComponent {
  render() {
    return <MiniOfflineSign />;
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#FF0000',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
  },
  offlineText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
});
export default OfflineNotice;
