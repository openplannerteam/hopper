import moment from 'moment';
import polyline from '@mapbox/polyline';

const toItineraryLegs = (tripInfo) => {
  const { journeys } = tripInfo;
  const journeyLegs = [];
  journeys.forEach(journey => {
    const legs = [];
    let i = 0;
    journey.segments.forEach(segment => {
      let { vehicle } = segment;
      if (vehicle === 'pedestrian') vehicle = 'walk';
      const leg = {
        startTime: moment(segment.departureTime).valueOf(),
        endTime: moment(segment.arrivalTime).valueOf(),
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        pathway: false,
        mode: vehicle.toUpperCase(),
        route: '',
        agencyTimeZoneOffset: 7200000,
        interlineWithPreviousLeg: false,
        from: {
          name: segment.from,
          lon: segment.coordsFrom.lon,
          lat: segment.coordsFrom.lat,
          departure: moment(segment.departureTime).valueOf(),
          orig: '',
          vertexType: 'NORMAL',
        },
        to: {
          name: segment.to,
          lon: segment.coordsTo.lon,
          lat: segment.coordsTo.lat,
          arrival: moment(segment.arrivalTime).valueOf(),
          departure: moment(segment.arrivalTime).valueOf() + 1000,
          vertexType: i + 1 >= journey.segments.length ? 'NORMAL' : 'TRANSIT',
        },
        rentedBike: false,
        transitLeg: false,
        duration: moment(segment.totalTime).seconds(),
        intermediateStops: [],
      };
      const coordinatesList = segment.coordinates.map((coords) => [coords.lon, coords.lat]);
      leg.legGeometry = {
        points: polyline.fromGeoJSON({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coordinatesList,
          },
          properties: {},
        }),
        length: coordinatesList.length,
      };
      legs.push(leg);
      i += 1;
    });
    journeyLegs.push(legs);
  });
  if (tripInfo.mode === 'bicycle') {
    console.log(journeys[0]);
    console.log(journeyLegs[0]);
  }
  return journeyLegs;
};

export default toItineraryLegs;
