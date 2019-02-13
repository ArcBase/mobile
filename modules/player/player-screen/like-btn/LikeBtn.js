import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { EvilIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';

@inject(stores => ({
  toggleLike: stores.likesStore.toggleLike.bind(stores.likesStore),
  isLiked: stores.likesStore.isLiked,
  entry: stores.playerStore.entry,
}))
export default class LikeBtn extends React.Component {
  render() {
    if (!this.props.entry) {
      return null;
    }
    if (this.props.isLiked) {
      return (
        <TouchableOpacity
          style={styles.controlTouch}
          onPress={() => this.props.toggleLike(this.props.entry)}
        >
          <EvilIcons name={'like'} size={32} color={Colors.brandBlue} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => this.props.toggleLike(this.props.entry)}
      >
        <EvilIcons name={'like'} size={32} color={Colors.dividerBackground} />
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  controlTouch: {
    width: 32,
    height: 28,
  },
});
