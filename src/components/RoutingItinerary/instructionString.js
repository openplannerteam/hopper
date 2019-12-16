import React from 'react';

import s from './style.module.scss';

export default function genMainInstructionString(position, size, vehicle, from, to) {
  let actionVerb;
  let preposition;
  if (position === 0) {
    actionVerb = 'Leave';
    preposition = 'from';
  } else if (vehicle === 'train') {
    actionVerb = 'Board the train';
    preposition = 'headed to';
  } else if (vehicle === 'bicycle' || vehicle === 'ebike') {
    actionVerb = 'Bike';
    preposition = 'to';
  } else {
    actionVerb = 'Walk';
    preposition = 'to';
  }
  return (
    <>
      <span className={s.itineraryLeg__text__emphasis}>
        {actionVerb}
      </span>
      {` ${preposition} `}
      <span className={s.itineraryLeg__text__emphasis}>
        {position === 0 ? from : to}
      </span>
      .
    </>
  );
}
