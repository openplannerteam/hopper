import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Feature } from 'react-mapbox-gl';
import legMarker from '../../utils/markers';
import LegsMarkers from '../LegsMarkers';

const PolylineLayer = (props) => {
  let { params } = props;
  params = params.sort((a) => (a.color === 'A0A0A0' ? -1 : 0));
  const polylineLayer = params.map((item) => {
    const { color, opacity } = item;
    return (
      <>
        <Layer
          type="line"
          paint={
            {
              'line-color': `#${color}`,
              'line-width': 6,
              'line-opacity': opacity,
            }
          }
          layout={
            {
              'line-join': 'round',
            }
          }
        >
          <Feature coordinates={item.line} />
        </Layer>
        <Layer
          type="line"
          paint={
            {
              'line-color': `#${color}`,
              'line-width': 2,
              'line-opacity': opacity === 1 ? 0.5 : 1,
              'line-gap-width': 6,
            }
          }
          layout={
            {
              'line-join': 'round',
            }
          }
        >
          <Feature coordinates={item.line} />
        </Layer>
      </>
    );
  });
  return polylineLayer;
};


function reversePolyline(polyline) {
  return polyline.map(point => point.slice().reverse());
}

// TODO refactor data structure to be unified (nor more indexes as link betwween data strucutres) TH
const Polylines = (props) => {
  const {
    polylines, colors, modes,
  } = props;
  const reversedPolylines = polylines.map(polyline => reversePolyline(polyline));
  if (!colors || !colors[0]) return null;
  const params = reversedPolylines.map((line, index) => {
    const endOfTrip = modes[index + 1] !== modes[index] && modes[index] !== 'TRAIN' && modes[index + 1] !== 'TRAIN';
    let color = colors[index];
    let opacity = 1;
    if (Array.isArray(colors[index])) {
      // This contains the optional opacity parameter
      // eslint-disable-next-line prefer-destructuring
      color = colors[index][0];
      // eslint-disable-next-line prefer-destructuring
      opacity = colors[index][1];
    }

    return {
      index,
      line,
      color,
      opacity,
      startMarker: color !== 'A0A0A0' ? legMarker(line[0], `#${color}`, `${line + index}`) : undefined,
      endMarker: (index === (reversedPolylines.length - 1) || endOfTrip) && color !== 'A0A0A0'
        ? legMarker(line[line.length - 1], `#${color}`, `${line + index}`) : undefined,
    };
  });
  return (
    <>
      <PolylineLayer params={params} />
      <LegsMarkers params={params} />
    </>
  );
};

Polylines.propTypes = {
  polylines: PropTypes.arrayOf(PropTypes.array).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Polylines;
