// @flow
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from 'components/Map';
import Header from 'components/Header';
import HomeScreen from 'screens/HomeScreen';
import LocationSearchScreen from 'screens/LocationSearchScreen';
import { updatePolylinesColors } from 'actions/tripsActions';

import 'styles/fonts.scss';
import './App.module.scss';

type Props = {
  journeys: Array,
  userPosition: Object,
  vehicle: String,
  updateColors: Function,
}

function AppRouter(props: Props) {
  const {
    journeys, userPosition, vehicle, updateColors,
  } = props;
  const [mapPosition, setMapPosition] = useState(undefined);
  const [mapPolylines, setMapPolylines] = useState();
  const [mapPolylinesColors, setMapPolylinesColors] = useState();
  const { t } = useTranslation();


  useEffect(() => {
    setMapPosition(userPosition.lon ? [userPosition.lon, userPosition.lat] : undefined);
  }, [userPosition]);

  useEffect(() => {
    updateColors();
    const polylines = [];
    const colors = [];
    journeys.forEach((journey) => {
      polylines.push(journey.polylines);
      colors.push(journey.polylinesColors);
    });

    setMapPolylines(polylines.flat());
    setMapPolylinesColors(colors.flat());
  }, [journeys, updateColors, vehicle]);

  return (
    <>
      <Router>
        <Route path="/" exact component={() => <HomeScreen fromRoute="/from" toRoute="/to" />} />
        <Route path="/to" component={() => <LocationSearchScreen searchTripRoute="/" searchId="to" label={`${t('to')}:`} />} />
        <Route path="/from" component={() => <LocationSearchScreen searchTripRoute="/" searchId="from" label={`${t('from')}:`} />} />
      </Router>
      <Map
        showControls
        center={mapPosition}
        userPos={mapPosition}
        polylines={mapPolylines}
        colors={mapPolylinesColors}
        // modes={modes}
        // intermediateStops={intermediateStops}
      />
      <Header />
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    trips, userPosition, vehicle,
  } = state;
  return {
    journeys: trips.journeys,
    userPosition,
    vehicle: (vehicle.vehicle || 'bicycle'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateColors: () => {
      dispatch(updatePolylinesColors());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
