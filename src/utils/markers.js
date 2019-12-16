import React from 'react';
import LayerMarker from '../components/LayerMarker';

export default function legMarker(coords, strokeColor, key) {
  return (
    <LayerMarker
      key={key}
      center={coords}
      radius={4}
      fillColor="#ffffff"
      strokeWidth={4}
      strokeColor={strokeColor}
    />
  );
}
