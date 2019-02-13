import React from 'react';
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';
import EntryRow from 'app/modules/ui/EntryRow';
import SearchingLoader from 'app/modules/ui/SearchingLoader';
import Colors from 'app/constants/Colors';
import BottomPlaceholder from 'app/modules/ui/BottomPlaceholder';

const SearchEntryList = inject(stores => ({
  loadPlayAndPushToCueList: stores.playerStore.loadPlayAndPushToCueList.bind(
    stores.playerStore
  ),
  entries: stores.entriesSearchStore.entries,
  searching: stores.entriesSearchStore.searching,
  query: stores.entriesSearchStore.query,
  addRecentEntrySearch: stores.entriesSearchStore.addRecentEntrySearch.bind(
    stores.entriesSearchStore
  ),
  disablePlaylistMode: stores.playerStore.disablePlaylistMode.bind(
    stores.playerStore
  ),
}))(
  ({
    loadPlayAndPushToCueList,
    entries,
    searching,
    query,
    addRecentEntrySearch,
    disablePlaylistMode,
  }) => (
    <ScrollView
      style={{
        backgroundColor: Colors.listItemBackground,
        flex: 1,
      }}
    >
      {SearchingLoader(searching, query)}
      {entries.map(entry =>
        EntryRow(
          loadPlayAndPushToCueList,
          entry,
          addRecentEntrySearch,
          null,
          disablePlaylistMode
        )
      )}
      <BottomPlaceholder />
    </ScrollView>
  )
);

export default SearchEntryList;
