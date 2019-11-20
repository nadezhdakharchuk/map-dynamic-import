import React from 'react';	
import dynamic from 'next/dynamic';

const SearchMap = ({ fetchedLocations, currentDestination }) => {	
  const DynamicComponentWithNoSSR = dynamic(() => import('../../molecules/Map'), {	
    ssr: false,	
  });	

  return (	
    <DynamicComponentWithNoSSR
      fetchedLocations={fetchedLocations}	
      currentDestination={currentDestination}	
      zoom={14}	
      ableToZoom
    />	
  );	
};	

export default SearchMap;