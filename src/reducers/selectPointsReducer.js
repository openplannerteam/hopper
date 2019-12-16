import { FROM_POINT_SELECTED, TO_POINT_SELECTED, REVERSE_POINTS } from '../actions/actionTypes';

export default function SelectPointsReducer(state = { }, action) {
  switch (action.type) {
    case FROM_POINT_SELECTED: {
      return {
        ...state,
        from: action.from,
        coordsFrom: action.coords,
      };
    }

    case TO_POINT_SELECTED: {
      return {
        ...state,
        to: action.to,
        coordsTo: action.coords,
      };
    }

    case REVERSE_POINTS: {
      return {
        ...state,
        from: action.to,
        to: action.from,
        coordsFrom: action.coordsTo,
        coordsTo: action.coordsFrom,
      };
    }
    default:
      return state;
  }
}
