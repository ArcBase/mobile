import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react';
import { ShuffleIconBlue, ShuffleIconGrey } from 'app/assets/images/Images';
import { Stores } from 'skyhitz-common';

const ShuffleBtn = inject((stores:Stores) => ({
  toggleShuffle: stores.playerStore.toggleShuffle.bind(stores.playerStore),
  shuffle: stores.playerStore.shuffle,
}))(({ toggleShuffle, shuffle }: any) => {
  if (shuffle) {
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => toggleShuffle()}
      >
        <Image style={styles.shuffleBtn} source={ShuffleIconBlue} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.controlTouch}
      onPress={() => toggleShuffle()}
    >
      <Image style={styles.shuffleBtn} source={ShuffleIconGrey} />
    </TouchableOpacity>
  );
});

export default ShuffleBtn;

var styles = StyleSheet.create({
  controlTouch: {
    alignSelf: 'center',
  },
  shuffleBtn: {
    width: 21,
    height: 18,
  },
});