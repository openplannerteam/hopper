// @flow
type DistanceMode = 'driving' | 'transit';

type Place = {
  id?: string,
  key?: string,
  name?: string,
  lat: number,
  lng: number,
};

export default function calculateDistance(
  fromPlace: Place, toPlace: Place, rounded: boolean = true,
) : DistanceMode {
  // console.log(fromPlace.lat);
  // rounded:
  // Re-enforce the impression this function
  // alors returns an approximation by rounding it est

  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((toPlace.lat - fromPlace.lat) * p) / 2
          + c(fromPlace.lat * p) * c(toPlace.lat * p)
          * (1 - c((toPlace.lon - fromPlace.lon) * p)) * 0.5;
  const preciseValue = (12742 * Math.asin(Math.sqrt(a)) * 1000); // 2 * R; R = 6371 km
  const roundedValue = Math.ceil(preciseValue / 1000) * 1000;
  const value = (rounded) ? roundedValue : preciseValue;
  return value;
}
