import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SearchButton from 'components/SearchButton';
import DeparturePicker from 'components/DeparturePicker';
import Button from 'components/Button';
import Popup from 'components/Popup';
import TripResults from 'screens/TripResults';
import setDepartureSettings from 'actions/setDepartureSettingsAction';
import { setItineraries, clearItinerariesError } from 'actions/tripsActions';
import {
  fromPointSelected,
  reversePoints,
} from 'actions/selectPointsActions';

import s from './style.module.scss';

type HomeScreenProps = {
  from: String,
  to: String,
  coordsFrom: String,
  coordsTo: String,
  fromRoute: Object,
  toRoute: Object,
  travelArriveBy: Boolean,
  travelDate: Date,
  userPosition: Object,
  storeFromPointSelected: Function,
  reverseStoredPoints: Function,
  storeDepartureSettings: Function,
  storeItineraries: Function,
  clearError: Function,
  journeys: Array,
  isFetchingItineraries: Boolean,
  networkError: Boolean | Object,
}

function HomeScreen(props: HomeScreenProps) {
  const {
    reverseStoredPoints, fromRoute, toRoute, coordsFrom, coordsTo,
    travelArriveBy, travelDate, storeDepartureSettings, from, to, userPosition,
    storeFromPointSelected, storeItineraries, clearError, journeys,
    isFetchingItineraries, networkError,
  } = props;

  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [placesErrorVisibility, setPlacesErrorVisibility] = useState(false);
  const [networkErrorVisibility, setNetworkErrorVisibility] = useState(false);
  const { t } = useTranslation();

  const visibleHome = (
    journeys.length === 0
  );
  const visibleTripResults = (
    (journeys.length > 0
    || isFetchingItineraries === true)
    && networkError === false
  );

  useEffect(() => {
    if (networkError) {
      setNetworkErrorVisibility(true);
    } else {
      setNetworkErrorVisibility(false);
    }
  }, [networkError]);

  if (from === undefined && userPosition && userPosition.lon && userPosition.lat) {
    storeFromPointSelected(t('current_location'), { lat: userPosition.lat, lon: userPosition.lon });
  }

  const handleReverseTrip = () => {
    reverseStoredPoints(from, to, coordsFrom, coordsTo);
  };

  const hideErrorPopup = () => {
    setNetworkErrorVisibility(false);
    clearError();
  };

  return (
    <>
      {
        networkErrorVisibility && (
          <Popup
            title={t('popup_network_error.title')}
            btn={t('popup_network_error.btn')}
            onClick={() => hideErrorPopup()}
          >
            {t('popup_network_error.content')}
          </Popup>
        )
      }
      {
        placesErrorVisibility && (
          <Popup
            title={t('popup_empty_places_error.title')}
            btn={t('popup_empty_places_error.btn')}
            onClick={() => setPlacesErrorVisibility(false)}
          >
            {t('popup_empty_places_error.content')}
          </Popup>
        )
      }
      {
        visibleHome && (
        <div className={s.homeContainer}>
          <div className={s.findRouteContainer}>
            <div className={s.fromToContainer}>
              <SearchButton
                id="from"
                route={fromRoute}
                text={from || t('from_placeholder')}
              />
              {(from && to) && (
                <>
                  <button className={s.reverseTrip} type="button" onClick={handleReverseTrip} aria-label="REVERSE" />
                </>
              )}
              <SearchButton
                id="to"
                route={toRoute}
                text={to || t('to_placeholder')}
              />
            </div>

            <div className={s.routeSchedule}>
              <span
                className={s.routeSchedule__btn}
                onKeyUp={() => setDatePickerVisibility(true)}
                onClick={() => setDatePickerVisibility(true)}
                role="menuitem"
                tabIndex="0"
              >
                {travelArriveBy ? t('travel_mode_arrive') : t('travel_mode_leave')}
              </span>
              {` ${t(travelArriveBy ? 'travel_mode_by' : 'travel_mode_at')} `}
              <span
                className={s.routeSchedule__btn}
                onKeyUp={() => setDatePickerVisibility(true)}
                onClick={() => setDatePickerVisibility(true)}
                role="menuitem"
                tabIndex="0"
              >
                {moment(travelDate || new Date()).format('HH:mm')}
              </span>
              {` ${t('travel_mode_on')} `}
              <span
                className={s.routeSchedule__btn}
                onKeyUp={() => setDatePickerVisibility(true)}
                onClick={() => setDatePickerVisibility(true)}
                role="menuitem"
                tabIndex="0"
              >
                {moment(travelDate || new Date()).format('DD/MM/YYYY')}
              </span>
              <Button
                fullWidth
                biggerText
                className={s.routeSchedule__searchBtn}
                onClick={() => {
                  if ((!coordsFrom || !coordsTo)) {
                    // TODO: differenciate if missing FROM or TO
                    return setPlacesErrorVisibility(true);
                  }
                  const travelTime = travelDate || new Date();
                  return storeItineraries(
                    coordsFrom, coordsTo, from, to, travelTime, travelArriveBy,
                  );
                }}
              >
                {t('find_your_route_button')}
              </Button>
            </div>
          </div>
          {
            datePickerVisibility && (
            <DeparturePicker
              date={travelDate}
              arriveBy={travelArriveBy}
              onChange={(departure) => {
                storeDepartureSettings(departure.arriveBy, departure.date);
              }}
              onCloseClick={() => {
                setDatePickerVisibility(false);
              }}
              onSubmit={() => {
                setDatePickerVisibility(false);
              }}
            />
            )
        }
        </div>
        )
      }
      {
        visibleTripResults && (
          <TripResults isLoading={isFetchingItineraries} trips={journeys} />
        )
      }
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    points, departureSettings, userPosition, trips,
  } = state;
  const {
    coordsTo, coordsFrom, from, to,
  } = points;
  const {
    travelArriveBy, travelDate,
  } = departureSettings;
  const {
    journeys, isFetchingItineraries, networkError,
  } = trips;
  return {
    from,
    to,
    coordsTo,
    coordsFrom,
    travelArriveBy,
    travelDate,
    userPosition,
    journeys,
    isFetchingItineraries,
    networkError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reverseStoredPoints: (from, to, coordsFrom, coordsTo) => {
      dispatch(reversePoints(from, to, coordsFrom, coordsTo));
    },
    storeDepartureSettings: (arriveBy, date) => {
      dispatch(setDepartureSettings(arriveBy, date));
    },
    storeFromPointSelected: (from, coords) => {
      dispatch(fromPointSelected(from, coords));
    },
    storeItineraries(coordsFrom, coordsTo, from, to, travelTime, travelArriveBy) {
      dispatch(setItineraries(coordsFrom, coordsTo, from, to, travelTime, travelArriveBy));
    },
    clearError: () => {
      dispatch(clearItinerariesError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
