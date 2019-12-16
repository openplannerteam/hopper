import moment from 'moment';

export const fromAPIToTripInfo = (data, maxTrips, from, to, mode) => {
  const { journeys } = data;
  const output = { mode, journeys: [] };
  for (let i = 0; i < Math.min(journeys.length, maxTrips); i += 1) {
    const journey = journeys[i];

    const { segments } = journey;
    const outputSegments = [];
    let cycleTime = 0;
    let trainCount = 0;
    segments.forEach((segment) => {
      const formattedSegment = {};
      if (segment.vehicle) {
        if (segment.vehicle.includes('irail.be')) { // if train
          formattedSegment.vehicle = 'train';
          trainCount += 1;
          const regex = segment.vehicle.match(/vehicle\/(.*?)\//);
          if (regex.length > 1) { // If we have a trainID
            const trainID = regex[1];
            formattedSegment.trainID = trainID;
          }
          formattedSegment.headsign = segment.headsign;
        } else {
          console.error('=================');
          console.error(segment.vehicle);
          console.error('=================');
        }
      } else {
        formattedSegment.vehicle = mode;
        if (mode === 'bicycle' || mode === 'ebike') cycleTime += segment.totalTime;
      }
      formattedSegment.totalTime = segment.totalTime;
      formattedSegment.departureTime = segment.departure.time;
      formattedSegment.from = segment.departure.location.name || from;
      formattedSegment.to = segment.arrival.location.name || to;
      formattedSegment.coordsFrom = {
        lon: segment.departure.location.lon,
        lat: segment.departure.location.lat,
      };
      formattedSegment.coordsTo = {
        lon: segment.arrival.location.lon,
        lat: segment.arrival.location.lat,
      };
      formattedSegment.coordinates = segment.coordinates;
      outputSegments.push(formattedSegment);
    });

    const duration = moment.duration(journey.travelTime, 'seconds');
    const durationDisplay = `${`${duration.hours()}`.padStart(2, '0')}:${`${duration.minutes()}`.padStart(2, '0')}`;
    const durationMinutesDisplay = `${Math.floor(journey.travelTime / 60)} min`;
    const bikeDurationDisplay = `${Math.floor(cycleTime / 60)} min`;

    const journeyOutput = {
      totalTime: durationDisplay,
      trainCount,
      tripTo: to,
      tripFrom: from,
      departureTime: journey.departure.time,
      arrivalTime: journey.arrival.time,
      travelTime: journey.travelTime,
      segments: outputSegments,
      cycleTime: bikeDurationDisplay,
      durationMinutesDisplay,
      mode,
    };
    output.journeys.push(journeyOutput);
  }
  return output;
};

export const fromAPIToPolylines = () => {

};
