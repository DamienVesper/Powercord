const { FluxDispatcher } = require('powercord/webpack');
const { FluxActions } = require('../constants');
const SpotifyAPI = require('../SpotifyAPI');

module.exports = {
  fetchDevices: async () => {
    const { devices } = await SpotifyAPI.getDevices();
    FluxDispatcher.dirtyDispatch({
      type: FluxActions.DEVICES_FETCHED,
      devices
    });
  },

  updateCurrentTrack: (newTrack) => {
    if (!FluxDispatcher.dirtyDispatch) {
      FluxDispatcher.dirtyDispatch({
        type: FluxActions.CURRENT_TRACK_UPDATED,
        track: newTrack
      });
    }
  },

  updatePlayerState: (newState) => {
    if (!FluxDispatcher.dirtyDispatch) {
      FluxDispatcher.dirtyDispatch({
        type: FluxActions.PLAYER_STATE_UPDATED,
        state: {
          ...newState,
          spotifyRecordedProgressAt: Date.now()
        }
      });
    }
  },

  updateCurrentLibraryState: (newState) => {
    if (!FluxDispatcher.dirtyDispatch) {
      FluxDispatcher.dirtyDispatch({
        type: FluxActions.LIBRARY_STATE_UPDATED,
        state: newState
      });
    }
  }
};
