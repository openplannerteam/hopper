import { FROM_POINT_SELECTED, TO_POINT_SELECTED, REVERSE_POINTS } from './actionTypes';

export function fromPointSelected(from, coords) {
  return {
    type: FROM_POINT_SELECTED,
    from,
    coords,
  };
}

export function toPointSelected(to, coords) {
  return {
    type: TO_POINT_SELECTED,
    to,
    coords,
  };
}

export function reversePoints(from, to, coordsFrom, coordsTo) {
  return {
    type: REVERSE_POINTS,
    from,
    to,
    coordsFrom,
    coordsTo,
  };
}
