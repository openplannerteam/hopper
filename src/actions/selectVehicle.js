import { SET_SELECTED_VEHICLE } from './actionTypes';

export default function setDepartureSettings(vehicle) {
  return {
    type: SET_SELECTED_VEHICLE,
    vehicle,
  };
}
