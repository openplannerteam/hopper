export const reverseCoordinates = (coordinatesToReverse = '') => {
  const stringArray = coordinatesToReverse.split(',');
  if (stringArray.length !== 2) {
    throw new Error('Invalid coordinates');
  }
  const reversedArray = stringArray.reverse();
  return reversedArray.join(',');
};

export const mapPositionToLatLng = position => [
  position.coords.longitude,
  position.coords.latitude,
];

export const formatCoordinates = (coordinatesArray = []) => {
  if (coordinatesArray.length !== 2) {
    throw new Error('Invalid coordinnates array');
  }

  return coordinatesArray.join(',');
};

export const stringCoordsToArrayOfInts = string => string.split(',').map(Number);
