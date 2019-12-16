import React from 'react';
import PropTypes from 'prop-types';
import { ZoomControl } from 'react-mapbox-gl';
import s from './style.module.scss';
import './zoomButtons.scss';
import ReCenterButton from '../ReCenterButton';


const MapControls = (props) => {
  const { centerClick } = props;
  return (
    <div className={s.mapUIContainer}>
      <ReCenterButton content="recenter" onClick={centerClick} className={s.reCenterButton} />
      <ZoomControl className={s.zoomButtons} />
    </div>
  );
};

MapControls.propTypes = {
  centerClick: PropTypes.func.isRequired,
};

export default MapControls;
