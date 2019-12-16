import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BikeTabIcon } from 'assets/images/icon-bike.svg';
import { ReactComponent as EbikeTabIcon } from 'assets/images/icon-bike-leaving.svg';
import { ReactComponent as PedestrianTabIcon } from 'assets/images/trip-walk.svg';
import RoutingItinerary from '../RoutingItinerary';
import setSelectedVehicle from '../../actions/selectVehicle';

import s from './style.module.scss';

type TripInfoDialogProps = {
  trips: Array,
  vehicle: String,
  selectVehicle: Function,
}

function TripInfoDialog(props: TripInfoDialogProps) {
  const { trips, vehicle, selectVehicle } = props;
  const { t } = useTranslation();

  const journey = trips ? trips.find(x => x.mode === vehicle).journeys[0] : undefined;

  const headerInfo = [
    { label: t('trip_time'), info: journey.totalTime },
    { label: t('cycle_time'), info: journey.cycleTime },
    { label: t('trains'), info: journey.trainCount },
    // { label: t('facilities'), info: 'P' },
  ].map(cell => (
    <div className={s.routing__header__cell} key={cell.label}>
      <div className={s.routing__header__cell__label}>
        {cell.label}
      </div>
      <div className={s.routing__header__cell__info}>
        {cell.info}
      </div>
    </div>
  ));

  const footerInfo = [
    { mode: 'pedestrian', icon: (<PedestrianTabIcon height={15} />) },
    { mode: 'ebike', icon: (<EbikeTabIcon height={15} />) },
    { mode: 'bicycle', icon: (<BikeTabIcon height={15} />) },
  ].map(cell => (
    <div
      className={`${s.routing__tabs__item} ${vehicle === cell.mode ? s['routing__tabs__item--active'] : ''}`}
      role="presentation"
      onKeyDown={() => { selectVehicle(cell.mode); }}
      onClick={() => { selectVehicle(cell.mode); }}
      key={cell.mode}
    >
      <div className={s.routing__tabs__item__icon}>
        {cell.icon}
      </div>
      <span className={s.routing__tabs__item__label}>
        { trips.find(x => x.mode === cell.mode) ? trips.find(x => x.mode === cell.mode).journeys[0].durationMinutesDisplay : ''}
      </span>
    </div>
  ));

  return (
    <div className={s.routing}>
      <div className={s.routing__handleBar} />
      <header className={s.routing__header}>
        {headerInfo}
      </header>
      <RoutingItinerary journey={journey} className={s.routing__itinerary} />
      <footer className={s.routing__tabs}>
        {footerInfo}
      </footer>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    vehicle,
  } = state;
  return {
    vehicle: (vehicle.vehicle || 'bicycle'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectVehicle: (vehicle) => {
      if (vehicle) dispatch(setSelectedVehicle(vehicle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripInfoDialog);
