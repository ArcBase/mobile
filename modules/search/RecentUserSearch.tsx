import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import UserRow from 'app/modules/ui/UserRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';
import { Stores } from 'skyhitz-common';

@inject((stores: Stores) => ({
  recentSearches: stores.usersSearchStore.recentSearches,
  loadingRecentSearches: stores.usersSearchStore.loadingRecentSearches,
  getProfileInfo: stores.profileStore.getProfileInfo.bind(stores.profileStore),
  getRecentSearches: stores.usersSearchStore.getRecentSearches.bind(
    stores.usersSearchStore
  ),
}))
export default class RecentUserSearch extends React.Component<any, any> {
  componentWillMount() {
    this.props.getRecentSearches();
  }
  render() {
    if (!this.props.loadingRecentSearches && !this.props.recentSearches.size) {
      return null;
    }
    return (
      <View>
        <Text style={styles.recentText}>Recent</Text>
        {SearchingLoader(this.props.loadingRecentSearches)}
        {this.props.recentSearches.map(user => (
          <UserRow user={user} key={user.id} />
        ))}
        <BottomPlaceholder />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recentText: {
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingTop: 14,
    paddingLeft: 10,
  },
});
