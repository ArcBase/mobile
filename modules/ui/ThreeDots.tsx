import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from 'app/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

var styles = StyleSheet.create({
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginLeft: 5,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
});

export default class ThreeDots extends React.Component<any, any> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>
    );
  }
}
