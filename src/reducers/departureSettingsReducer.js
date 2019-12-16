import { SET_DEPARTURE_SETTINGS } from '../actions/actionTypes';

export default function SelectPointsReducer(state = { }, action) {
  switch (action.type) {
    case SET_DEPARTURE_SETTINGS: {
      return {
        ...state,
        travelArriveBy: action.arriveBy,
        travelDate: action.date,
      };
    }
    default:
      return state;
  }
}
