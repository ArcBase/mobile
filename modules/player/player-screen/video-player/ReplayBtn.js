import React from 'react';
import { inject } from 'mobx-react/native';
import { ReplayIcon } from 'app/modules/player/player-screen/video-player/VideoIcons';
import CenteredView from 'app/modules/player/player-screen/video-player/CenteredView';
import { PLAYBACK_STATES } from 'app/modules/player/player-screen/video-player/UiStates';
import Control from 'app/modules/player/player-screen/video-player/Control';

const ReplayBtn = inject(stores => ({
  playbackState: stores.playerStore.playbackState,
  replay: stores.playerStore.replay.bind(stores.playerStore),
}))(({ playbackState, replay }) => {
  if (playbackState == PLAYBACK_STATES.ENDED) {
    return (
      <CenteredView>
        <Control center={true} callback={replay.bind(this)}>
          <ReplayIcon />
        </Control>
      </CenteredView>
    );
  }
  return null;
});

export default ReplayBtn;
