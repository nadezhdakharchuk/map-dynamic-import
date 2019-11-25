import React from 'react';
import dynamic from 'next/dynamic';

const MapDynamicComponentWithNoSSR = dynamic(() => import('./MapView'), {
  ssr: false,
});

const Map = props => {
  return <MapDynamicComponentWithNoSSR {...props} />;
};

export default Map;
