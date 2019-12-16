import React from 'react';

import s from './style.module.scss';

export default function genDetailedInstructionString(vehicle, duration, destination) {
  let actionVerb;
  let preposition;
  if (vehicle === 'bicycle' || vehicle === 'ebike') {
    actionVerb = `Bike ${duration}`;
    preposition = ' to ';
  } else if (vehicle === 'train') {
    actionVerb = `${duration} ride`;
    preposition = ', alight at ';
  } else {
    actionVerb = `Walk ${duration}`;
    preposition = ' towards ';
  }
  return (
    <>
      <span className={s.itineraryLeg__details__description__emphasis}>{actionVerb}</span>
      {preposition}
      <span className={s.itineraryLeg__details__description__emphasis}>
        {`${destination}`}
      </span>
      .
    </>
  );
}
