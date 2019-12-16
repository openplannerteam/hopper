import { handleActions } from 'redux-actions';
import { setItinerariesActions } from 'actions/tripsActions';
import {
  UNSET_ITINERARIES, SET_SUMMARY_POPUP_VISIBLE, REMOVE_ITINERARIES_ERROR, UPDATE_POLYLINE_COLORS,
} from 'actions/actionTypes';

const initialState = {
  journeys: [],
  isFetchingItineraries: false,
  networkError: false,
  summaryPopupShown: false,
};

export default handleActions({
  [setItinerariesActions.request]: state => ({
    ...state,
    journeys: [],
    isFetchingItineraries: true,
    networkError: false,
    summaryPopupShown: false,
  }),
  [setItinerariesActions.error]: (state, action) => ({
    ...state,
    journeys: [],
    isFetchingItineraries: false,
    networkError: action.payload || true,
    summaryPopupShown: false,
  }),
  [setItinerariesActions.success]: (state, action) => ({
    ...state,
    journeys: action.payload,
    isFetchingItineraries: false,
    networkError: false,
    summaryPopupShown: false,
  }),
  [UNSET_ITINERARIES]: state => ({
    ...state,
    journeys: [],
    summaryPopupShown: false,
  }),
  [SET_SUMMARY_POPUP_VISIBLE]: state => ({
    ...state,
    summaryPopupShown: true,
  }),
  [REMOVE_ITINERARIES_ERROR]: state => ({
    ...state,
    networkError: false,
  }),
  [UPDATE_POLYLINE_COLORS]: (state, action) => ({
    ...state,
    journeys: action.payload,
  }),
}, initialState);
