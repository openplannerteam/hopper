import React, { useState, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Popup from 'components/Popup';
import TripInfoDialog from 'components/TripInfoDialog';
import setSelectedVehicle from 'actions/selectVehicle';
import { setItinerariesActions, unsetItineraries, setSummaryPopupVisible } from 'actions/tripsActions';

import s from './style.module.scss';

type Props = {
  trips: Array,
  isLoading: Boolean,
  clearItineraries: Function,
  throwItinerariesError: Function,
  summaryPopupVisible: Function,
  summaryPopupShown: Boolean,
}

function TripResults(props: Props) {
  const {
    trips,
    isLoading,
    clearItineraries,
    throwItinerariesError,
    summaryPopupVisible,
    summaryPopupShown,
  } = props;
  const { t } = useTranslation();
  const [summaryPopupVisibility, setSummaryPopupVisibility] = useState(false);

  useLayoutEffect(() => {
    const header = document.querySelector('div[class^="style_logo__"]').getBoundingClientRect();
    const headerSize = header.top + header.height;
    document.documentElement.style.setProperty('--header-height', `${headerSize}px`);
  }, []);

  useEffect(() => {
    if (isLoading || summaryPopupShown) return;
    setSummaryPopupVisibility(true);
  }, [isLoading, summaryPopupShown]);

  const hideSummaryPopup = () => {
    setSummaryPopupVisibility(false);
    summaryPopupVisible();
  };

  const handleScroll = (e) => {
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
    const scrollingHeight = Math.round(parseFloat(window.getComputedStyle(e.target).getPropertyValue('padding-top')) - headerHeight - 24);
    document.documentElement.style.setProperty('--mapui-opacity', 1 - (e.target.scrollTop / scrollingHeight));
  };

  if (isLoading) {
    return (
      <Popup isLoader />
    );
  }

  const ebikeTrip = trips.find(x => x.mode === 'ebike');
  const bikeTrip = trips.find(x => x.mode === 'bicycle');

  if (ebikeTrip.journeys.length === 0 || bikeTrip.journeys.length === 0) {
    throwItinerariesError();
    return null;
  }
  const bicycleTime = bikeTrip.journeys[0].travelTime;
  const ebikeTime = ebikeTrip.journeys[0].travelTime;
  // If timeDifference is positive, it means it was faster to use
  // a regular bike. Not sure if that'd ever happen but hey
  const timeDifference = ebikeTime - bicycleTime;
  const timeDifferenceMinutes = Math.round(timeDifference / 60);
  const timeHuman = Math.round(moment.duration(Math.abs(timeDifference), 'seconds').asMinutes());
  let title = null;
  let result = null;

  if (timeDifferenceMinutes === 0) {
    title = t('popup_results.result_identical_title');
    result = t('popup_results.result_identical');
  } else if (timeDifferenceMinutes > 0) {
    title = t('popup_results.result_ebike_slower_title');
    result = t('popup_results.result_ebike_slower');
  } else {
    title = t('popup_results.result_ebike_faster_title');
    result = t('popup_results.result_ebike_faster', {
      minutes: timeHuman,
    });
  }

  return (
    <>
      {summaryPopupVisibility && (
        <Popup title={title} btn={t('popup_results.btn')} onClick={() => hideSummaryPopup()}>
          {result}
        </Popup>
      )}
      <div className={s.tripResults} onScroll={(e) => handleScroll(e)}>
        <button
          type="button"
          className={s.tripResults__close}
          onClick={() => clearItineraries()}
          aria-label="Close"
        />
        <TripInfoDialog trips={trips} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    vehicle, trips,
  } = state;
  return {
    vehicle: (vehicle.vehicle || 'bicycle'),
    summaryPopupShown: trips.summaryPopupShown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectVehicle: (vehicle) => {
      if (vehicle) dispatch(setSelectedVehicle(vehicle));
    },
    clearItineraries() {
      dispatch(unsetItineraries());
    },
    throwItinerariesError() {
      dispatch(setItinerariesActions.error({ error: 'Unable to gather a bike itinerary' }));
      dispatch(unsetItineraries());
    },
    summaryPopupVisible() {
      dispatch(setSummaryPopupVisible());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripResults);
