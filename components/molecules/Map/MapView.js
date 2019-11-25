import React, { useState } from 'react';
import isSupported from '@mapbox/mapbox-gl-supported';
import MapboxLeaflet from './MapboxLeaflet';
import MapboxGl from './MapboxGl';

const MapView = props => {
  const [isError, setError] = useState(false);

  const onMapError = () => {
    setError(true);
  };

  if (isSupported && !isError) {
    return <MapboxGl {...props} onMapError={onMapError} />;
  }

  return <MapboxLeaflet {...props} />;
};

export default MapView;
