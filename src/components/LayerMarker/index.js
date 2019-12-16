
import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Feature } from 'react-mapbox-gl';

function LayerMarker(props) {
  const {
    center,
    radius,
    fillColor,
    strokeWidth,
    strokeColor,
  } = props;

  if (!center) { return null; }

  return (
    <Layer
      type="circle"
      paint={{
        'circle-radius': radius,
        'circle-color': fillColor,
        'circle-stroke-width': strokeWidth,
        'circle-stroke-color': strokeColor,
        'circle-pitch-scale': 'viewport',
      }}
    >
      <Feature coordinates={center} />
    </Layer>
  );
}

LayerMarker.defaultProps = {
  center: undefined,
  radius: 10,
  fillColor: '#000000',
  strokeWidth: 0,
  strokeColor: '#FFFFFF',
};

LayerMarker.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  radius: PropTypes.number,
  fillColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
};

export default LayerMarker;
