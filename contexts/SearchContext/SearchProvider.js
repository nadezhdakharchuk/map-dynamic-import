import React, { useReducer } from 'react';
import reducer from 'models/reducer';
import SearchContext from '.';

const SearchProvider = ({ children, value }) => {
  const { locationFeatures, nearbyLocations } = value;

  const initialState = {
    nearbyLocations,
    locationFeaturesFilter: {
      checkedFeatures: [],
      features: locationFeatures,
    },
    distancesFilter: {
      checkedDistance: null,
      distances: [
        {
          title: '1 mile',
          icon: null,
          id: 1,
        },
        {
          title: '2 miles',
          icon: null,
          id: 2,
        },
        {
          title: '3 miles',
          icon: null,
          id: 3,
        },
        {
          title: '4 miles',
          icon: null,
          id: 4,
        },
        {
          title: '5 miles',
          icon: null,
          id: 5,
        },
      ],
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
