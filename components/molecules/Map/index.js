import React, { useState } from 'react';
import isSupported from '@mapbox/mapbox-gl-supported';
import Mapbox from './Mapbox';
import MapboxGl from './MapboxGl';

const Map = props => {
  const [isError, setError] = useState(false);

  const onMapError = () => {
    setError(true);
  };

  if (isSupported && !isError) {
    return <MapboxGl {...props} onMapError={onMapError} />;
  }

  return <Mapbox {...props} />;
};

export default Map;
