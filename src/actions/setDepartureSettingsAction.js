import { SET_DEPARTURE_SETTINGS } from './actionTypes';

export default function setDepartureSettings(arriveBy, date) {
  return {
    type: SET_DEPARTURE_SETTINGS,
    arriveBy,
    date,
  };
}
