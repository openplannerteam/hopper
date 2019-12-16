import { handleActions } from 'redux-actions';
import { fetchUserPoisitionActions } from '../actions/userPositionActions';

const initialState = {
  invalidPosition: false,
  isFetchingPosition: false,
};

export default handleActions({
  [fetchUserPoisitionActions.request]: state => ({
    ...state,
    isFetchingPosition: true,
    invalidPosition: false,
  }),
  [fetchUserPoisitionActions.error]: (state, action) => ({
    ...state,
    isFetchingPosition: false,
    invalidPosition: action.payload || true,
  }),
  [fetchUserPoisitionActions.success]: (state, action) => ({
    ...state,
    isFetchingPosition: false,
    invalidPosition: false,
    lat: action.payload.coords.latitude,
    lon: action.payload.coords.longitude,
  }),

  WITHOUT_GEOLOC: state => ({
    ...state,
    dismissedError: true,
  }
  ),
}, initialState);
