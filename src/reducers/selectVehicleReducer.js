import { SET_SELECTED_VEHICLE } from '../actions/actionTypes';

export default function setTripDetails(state = { }, action) {
  switch (action.type) {
    case SET_SELECTED_VEHICLE: {
      return {
        ...state,
        vehicle: action.vehicle,
      };
    }
    default:
      return state;
  }
}
