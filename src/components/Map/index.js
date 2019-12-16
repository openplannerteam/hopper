import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash';
import mapConfig from '../../mapConfig';
import MapControls from '../MapControls';
import Polylines from '../Polylines';
import { findBounds } from './utils';
import LayerMarker from '../LayerMarker';
import MapItem from './MapItem';

import s from './style.module.scss';

// =============================================================================
// Config
// =============================================================================

// TODO make this a user driven value (see issue #33)
const DEFAULT_COORDS = [4.3571273, 50.8452665];
const DEFAULT_DELTA = 0.001;

function getBounds(coordsArr, delta) {
  const lat = coordsArr[0];
  const lon = coordsArr[1];
  return [[lat - delta, lon - delta], [lat + delta, lon + delta]];
}

function setMapStyle(bool) {
  if (!bool) {
    return (
      {
        height: '100vh',
        width: '100%',
      }
    );
  }
  return (
    {
      height: '100vh',
      width: '70vw',
    }
  );
}


class Map extends React.Component {
  constructor(props) {
    super(props);

    const { polylines, center } = this.props;
    const hasPolylines = polylines && polylines.length;

    const fitBounds = hasPolylines
      ? findBounds(polylines)
      : getBounds(center, DEFAULT_DELTA);

    this.state = {
      fitBounds,
    };
  }

  shouldComponentUpdate(nextProps) {
    const { colors } = this.props;
    return (!colors.length || colors !== nextProps.colors);
  }

  componentDidUpdate(prevProps) {
    const { polylines, center } = this.props;
    if (polylines !== prevProps.polylines || center !== prevProps.center) {
      this.resetFitBounds();
    }
  }


  fitBoundsOptions = () => {
    const { userPos, isDesktop } = this.props;
    const { fitBounds } = this.state;

    function getWindowHeightPercentage(value) {
      const windowHeight = window.innerHeight;
      return (windowHeight - (windowHeight * value) / 100).toFixed(0);
    }

    // TODO: investigate behavior on large bounds (TEST from Gare Centrale to Etterbeek)
    if (isEqual(fitBounds, getBounds(userPos, DEFAULT_DELTA))) {
      return {
        padding: {
          top: 60,
          right: 60,
          bottom: 60,
          left: 60,
        },
      };
    }

    return {
      padding: {
        top: 124,
        bottom: isDesktop ? 40 : getWindowHeightPercentage(60),
        left: isDesktop ? 40 : 60,
        right: isDesktop ? 40 : 60,
      },
    };
  }


  resetFitBounds = () => {
    const { polylines, center } = this.props;
    const hasPolylines = polylines && polylines.length;
    const fitBounds = hasPolylines
      ? findBounds(polylines)
      : getBounds(center, DEFAULT_DELTA);

    this.setState({
      fitBounds,
    });
  }

  handleCenterClick = () => {
    const { userPos } = this.props;
    this.setState({
      fitBounds: getBounds(userPos, DEFAULT_DELTA),
    });
  }

  render() {
    // TODO: Uniformise places object accross
    //       app ([lon, lat], {lat,lng}, {lat, lon} --> {lat,lng}) - T.H.
    const {
      showControls,
      userPos,
      polylines,
      colors,
      modes,
      intermediatesStops,
      isDesktop,
      lang,
    } = this.props;

    const creditsStyle = {
      position: 'fixed',
      right: '10px',
      bottom: '5px',
      margin: 0,
      padding: 0,
      fontSize: '12px',
    };

    const {
      fitBounds,
    } = this.state;

    return (
      <div className={s.map}>
        <MapItem
          containerStyle={setMapStyle(isDesktop)}
          style={mapConfig(lang).mapStyle}
          fitBounds={fitBounds}
          fitBoundsOptions={this.fitBoundsOptions()}
          movingMethod="easeTo"
          animationOptions={{
            duration: 0,
            animate: false,
          }}
          ref={(e) => { this.map = e; }}
        >
          {showControls && (
            <MapControls
              centerClick={this.handleCenterClick}
            />
          )}

          {userPos && (
            <LayerMarker
              center={userPos}
              radius={8}
              fillColor="#1A81FB"
              strokeWidth={3.5}
              strokeColor="#FFFFFF"
            />
          )}
          {polylines.length > 0 && (
            <Polylines
              polylines={polylines}
              colors={colors}
              modes={modes}
              intermediatesStops={intermediatesStops}
            />
          )}

        </MapItem>
        <p style={creditsStyle}>
          Map renderer &copy; SMOP – Map Data &copy;
          {' '}
          <a href="https://www.openstreetmap.org/" target="blank">Open Street Map</a>
        </p>
      </div>
    );
  }
}

Map.defaultProps = {
  center: DEFAULT_COORDS,
  showControls: false,
  colors: [''],
  modes: [''],
  intermediatesStops: [[]],
  userPos: DEFAULT_COORDS,
  polylines: [],
  isDesktop: false, // eslint-disable-line react/forbid-prop-types
  lang: 'en',
};

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  userPos: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
  ]),
  showControls: PropTypes.bool,
  polylines: PropTypes.arrayOf(
    PropTypes.array,
  ),
  colors: PropTypes.arrayOf(PropTypes.string),
  modes: PropTypes.arrayOf(PropTypes.string),
  intermediatesStops: PropTypes.arrayOf(PropTypes.array),
  isDesktop: PropTypes.bool,
  lang: PropTypes.string,
};

export default Map;
