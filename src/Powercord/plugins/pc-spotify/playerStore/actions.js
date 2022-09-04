const { FluxDispatcher, getModule } = require('powercord/webpack');
const { FluxActions } = require('../constants');
const SpotifyAPI = require('../SpotifyAPI');

FluxDispatcher.dirtyDispatch = getModule([ 'dirtyDispatch' ], false);

module.exports = {
  fetchDevices: async () => {
    const { devices } = await SpotifyAPI.getDevices();
    FluxDispatcher.dirtyDispatch({
      type: FluxActions.DEVICES_FETCHED,
      devices
    });
  },

  updateCurrentTrack: (newTrack) => {
    FluxDispatcher.dirtyDispatch({
      type: FluxActions.CURRENT_TRACK_UPDATED,
      track: newTrack
    });
  },

  updatePlayerState: (newState) => {
    FluxDispatcher.dirtyDispatch({
      type: FluxActions.PLAYER_STATE_UPDATED,
      state: {
        ...newState,
        spotifyRecordedProgressAt: Date.now()
      }
    });
  },

  updateCurrentLibraryState: (newState) => {
    FluxDispatcher.dirtyDispatch({
      type: FluxActions.LIBRARY_STATE_UPDATED,
      state: newState
    });
  }
};
