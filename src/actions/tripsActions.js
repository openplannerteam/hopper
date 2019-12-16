import mapBoxPolyline from '@mapbox/polyline';
import { createAction } from 'redux-actions';
import getTransit from 'api/routing';
import { fromAPIToTripInfo } from 'utils/hopperParser';
import getLegInfo from 'utils/getLegInfo';
import toItineraryLegs from 'utils/toItineraryLegs';
import config from 'config';
import { createAsyncActions } from './utils';
import {
  SET_ITINERARIES, UNSET_ITINERARIES, SET_SUMMARY_POPUP_VISIBLE,
  REMOVE_ITINERARIES_ERROR, UPDATE_POLYLINE_COLORS,
} from './actionTypes';

const createPolylines = (legs) => {
  const polylines = [];
  const colors = [];

  legs.forEach((leg) => {
    const legInfo = getLegInfo(leg);

    if (legInfo) {
      leg.map((step) => mapBoxPolyline.decode(step.legGeometry.points)).forEach(item => {
        polylines.push(item);
      });

      legInfo.forEach((info) => {
        const { legColor } = info;
        let color = legColor;
        if (!legColor) {
          color = 'A0A0A0';
        }
        colors.push(color);
      });
    }
  });

  return {
    polylines,
    polylinesColors: colors,
  };
};

const fetchItineraries = async (
  coordsFrom, coordsTo, placeFrom, placeTo, travelTime, travelArriveBy,
) => {
  return Promise.all(
    config.transportModes.map(mode => {
      return getTransit(coordsFrom, coordsTo, travelTime, travelArriveBy, mode).then((result) => {
        const tripInfo = fromAPIToTripInfo(result.data || result, 1, placeFrom, placeTo, mode);
        const itineraryLegs = toItineraryLegs(tripInfo);
        const polylines = createPolylines(itineraryLegs);
        return {
          ...tripInfo,
          ...polylines,
        };
      });
    }),
  );
};

export const setItinerariesActions = createAsyncActions(SET_ITINERARIES);

export const setItineraries = (
  coordsFrom, coordsTo, placeFrom, placeTo, travelTime, travelArriveBy,
) => (dispatch) => {
  dispatch(setItinerariesActions.request());
  return fetchItineraries(coordsFrom, coordsTo, placeFrom, placeTo, travelTime, travelArriveBy)
    .then(result => dispatch(setItinerariesActions.success(result)))
    .catch(error => dispatch(setItinerariesActions.error({ error })));
};

export function unsetItineraries() {
  return {
    type: UNSET_ITINERARIES,
  };
}

export function setSummaryPopupVisible() {
  return {
    type: SET_SUMMARY_POPUP_VISIBLE,
  };
}

export function clearItinerariesError() {
  return {
    type: REMOVE_ITINERARIES_ERROR,
  };
}

const updatePolylinesColorsAction = createAction(UPDATE_POLYLINE_COLORS);

export const updatePolylinesColors = () => (dispatch, getState) => {
  const state = getState();
  const { journeys } = state.trips;
  const { vehicle } = state.vehicle;

  journeys.forEach((journey) => {
    const { polylinesColors, mode } = journey;
    const opacity = mode === vehicle ? 1 : 0.5;

    polylinesColors.forEach((color, index) => {
      if (Array.isArray(color)) {
        polylinesColors[index] = [color[0], opacity];
      } else {
        polylinesColors[index] = [color, opacity];
      }
    });
  });

  dispatch(updatePolylinesColorsAction(journeys));
};
