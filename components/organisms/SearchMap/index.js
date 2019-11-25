import React from 'react';	
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../../molecules/Map'), {	
  ssr: false,	
});	

const SearchMap = ({ fetchedLocations, currentDestination }) => {	
  

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