import HttpClient from './httpClient';
import config from '../config';

const getTransit = (fromCoords, toCoords, travelTime, arriveBy, mode) => {
  const from = `https://www.openstreetmap.org/#map=19/${fromCoords.lat}/${fromCoords.lon}`;
  const to = `https://www.openstreetmap.org/#map=19/${toCoords.lat}/${toCoords.lon}`;
  const params = {
    from,
    to,
    inBetweenOsmProfile: 'crowsflight',
    firstMileOsmProfile: mode,
    inBetweenSearchDistance: 0,
    firstMileSearchDistance: 10000,
    lastMileOsmProfile: 'pedestrian',
    lastMileSearchDistance: 10000,
    multipleOptions: true,
  };

  if (arriveBy) params.arrival = travelTime;
  else params.departure = travelTime;

  return HttpClient.get(config.transitApiRoute, params);
};

export default getTransit;
