import React from 'react';
import { inject } from 'mobx-react';
import { StyleSheet, Image } from 'react-native';
import { PlayBtnWhite, PauseBtnWhite } from 'app/assets/images/Images';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  playing: stores.playerStore.isPlaying,
  pauseAsync: stores.playerStore.pauseAsync.bind(stores.playerStore),
  playAsync: stores.playerStore.playAsync.bind(stores.playerStore),
}))
export default class PlayBtnSmall extends React.Component<any, any> {
  handlePause() {
    this.props.pauseAsync();
  }
  handlePlay() {
    this.props.playAsync();
  }
  render() {
    if (this.props.playing) {
      return (
        <TouchableOpacity
          style={styles.playBtnWrapper}
          onPress={this.handlePause.bind(this)}
        >
          <Feather name="pause" size={18} color="white" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.playBtnWrapper}
        onPress={this.handlePlay.bind(this)}
      >
        <Feather name="play" size={18} color="white" />
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  playBtnWrapper: {
    width: 39,
    height: 39,
    justifyContent: 'center',
  },
  playBtn: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
