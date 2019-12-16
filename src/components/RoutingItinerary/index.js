import React from 'react';
import moment from 'moment';
import Roundel from 'components/Roundel';
import { ReactComponent as Bike } from 'assets/images/icon-trip-bike.svg';
import { ReactComponent as Train } from 'assets/images/icon-trip-train.svg';
import { ReactComponent as Walk } from 'assets/images/trip-walk.svg';
import genMainInstructionString from './instructionString';
import genDetailedInstructionString from './detailedInstructionString';

import s from './style.module.scss';

type RoutingItineraryProps = {
  journey: Object,
  className: String,
}

const getIconForVehicle = (vehicle) => {
  return {
    bicycle: <Bike />,
    train: <Train />,
    walk: <Walk />,
  }[vehicle];
};

const formatTripDuration = (totalTime) => {
  const duration = moment.duration(totalTime, 'seconds');
  if (totalTime < 3600) {
    return `${duration.minutes()} min`;
  }
  return `${(`${duration.hours()}`)}h${(`${duration.minutes() % 60}`).padStart(2, '0')}`;
};

const vehicleClasses = {
  train: 'train',
  ebike: 'bicycle',
  bicycle: 'bicycle',
  pedestrian: 'walk',
};

function RoutingItinerary(props: RoutingItineraryProps) {
  const { journey, className } = props;

  const legItems = [];

  let i = 0;
  journey.segments.forEach(segment => {
    const vehicleClass = vehicleClasses[segment.vehicle];
    const itineraryLeg = (
      <div className={s.itineraryLeg} key={segment.departureTime}>
        <div className={s.itineraryLeg__time}>
          {moment(segment.departureTime).format('HH:mm')}
        </div>
        <div className={s.itineraryLeg__graphics}>
          <Roundel mode={vehicleClass} />
        </div>
        <div className={[s.itineraryLeg__rightSide, s[`itineraryLeg__rightSide--${vehicleClass}`]].join(' ')}>
          <div className={s.itineraryLeg__text}>
            {
              genMainInstructionString(i, journey.segments.length,
                segment.vehicle, segment.from, segment.to)
            }
          </div>
          <div className={s.itineraryLeg__details}>
            <div className={s.itineraryLeg__details__mode}>
              {getIconForVehicle(vehicleClass)}
            </div>
            <div className={[s.itineraryLeg__details__description, s[`itineraryLeg__details__description--${vehicleClass}`]].join(' ')}>
              {genDetailedInstructionString(segment.vehicle,
                formatTripDuration(segment.totalTime),
                segment.to)}
            </div>
          </div>
        </div>
      </div>
    );
    legItems.push(itineraryLeg);
    i += 1;
  });

  return (
    <div className={className}>
      {legItems}
      <div className={s.itineraryLeg}>
        <div className={s.itineraryLeg__time}>
          {moment(journey.arrivalTime).format('HH:mm')}
        </div>
        <div className={s.itineraryLeg__graphics}>
          <Roundel mode={vehicleClasses[journey.mode]} />
        </div>
        <div>
          <div className={s.itineraryLeg__text}>
            <span className={s.itineraryLeg__text__emphasis}>
              Arrived
            </span>
            {' '}
            at
            {' '}
            <span className={s.itineraryLeg__text__emphasis}>
              {journey.tripTo}
            </span>
            {journey.mode === 'pedestrian' ? '.' : ', park your bike safely.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutingItinerary;
