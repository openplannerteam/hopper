import React from 'react';
import PropTypes from 'prop-types';

const LegsMarkers = (props) => {
  const { params } = props;
  const startMarker = params.map((item) => (
    item.startMarker
  ));
  const endMarker = params.map((item) => (
    item.endMarker
  ));
  const markers = params.map((item, index) => (
    <React.Fragment key={`${item.line + index} ${item.color}`}>
      {startMarker}
      {endMarker}
    </React.Fragment>
  ));
  return markers;
};

LegsMarkers.propTypes = {
  params: PropTypes.arrayOf(PropTypes.object),
};

LegsMarkers.defaultProps = {
  params: [],
};

export default LegsMarkers;
