import React, { useState } from 'react';
import Head from 'next/head';
import qs from 'qs';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import withGlobalData from 'lib/withGlobalData';
import { withApolloClient } from 'lib/withApolloClient';
import queries from 'config/queries';
import LocationService from 'services/LocationService';
import SearchCompleteService from 'services/SearchCompleteService';
import SearchProvider from 'contexts/SearchContext/SearchProvider';
import SearchTemplate from 'components/templates/SearchTemplate';
import SearchList from 'components/organisms/SearchList';
import { ReactComponent as ArrowRight } from 'static/images/icons/arrow_right.svg';
import Map from '../components/molecules/Map';

const SearchListWrapper = styled.div`
  width: 50%;
  border-right: 1px solid #adadad;
  margin-left: 0;
  transition: margin-left 0.2s ease;
  position: relative;
  height: auto;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    border-right: 0;
    order: 2;
  }

  &.closed {
    margin-left: -50%;
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 1.25rem;
  right: -2.65625rem;
  left: auto;
  background-color: #fff;
  padding: 0.625rem 0.3125rem;
  border-top: 0.0625rem solid #adadad;
  border-right: 0.0625rem solid #adadad;
  border-bottom: 0.0625rem solid #adadad;
  border-top-right-radius: 0.3125rem;
  border-bottom-right-radius: 0.3125rem;
  width: 2.8125rem;
  height: 2.5rem;
  z-index: 1;
  transition: right 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }

  &:hover {
    right: -2.5rem;
  }

  svg {
    width: 1.5625rem;
    height: 1.5625rem;
    fill: #000;
    transform: rotate(180deg);
    transition-delay: 0.2s;

    .closed & {
      transform: rotate(0);
    }
  }
`;

const SearchMapWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 50%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 18.75rem;
    order: 1;
  }

  &.full {
    width: 100%;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  width: 200%;
  height: 100%;
  margin: 0 -50%;

  .full & {
    width: 100%;
    margin: 0;
  }
`;

const Search = props => {
  const { nearbyLocations, locationFeatures, currentDestination, query } = props;
  const [mapFull, setMapFull] = useState(false);

  const toggleMap = () => {
    setMapFull(!mapFull);
  };

  console.log(query)

  const globalData = useQuery(queries.GET_GLOBAL_DATA, {
    pollInterval: 60000,
  });

  return (
    <>
      <Head>
        <title>Premium Parking</title>
      </Head>
      <SearchProvider value={{ locationFeatures, nearbyLocations }}>
        <SearchTemplate globalData={globalData} currentDestination={currentDestination}>
          <SearchListWrapper className={mapFull && 'closed'}>
            <ToggleButton onClick={toggleMap}>
              <ArrowRight />
            </ToggleButton>
            <SearchList fetchedLocations={nearbyLocations} currentDestination={currentDestination} />
          </SearchListWrapper>

          <SearchMapWrapper className={mapFull && 'full'}>
            <MapWrapper>
              <Map fetchedLocations={nearbyLocations} currentDestination={currentDestination} zoom={14} ableToZoom />
            </MapWrapper>
          </SearchMapWrapper>
        </SearchTemplate>
      </SearchProvider>
    </>
  );
};

Search.getInitialProps = async ctx => {
  const { apiService, asPath, query } = ctx;
  const locationService = new LocationService(apiService);
  const searchCompleteService = new SearchCompleteService(apiService);
  const query1 = qs.parse(asPath.replace(/\/.*\//, 'name=').replace('?', '&'));
  const { latitude, longitude, name, address } = query1;
  let { radius, features } = query1;
  let nearbyLocations = null;
  let locationFeatures = [];

  radius = radius ? +radius : 1;
  features = features && features.length > 0 ? features.map(item => +item) : [];

  const currentDestination = {
    name,
    latitude,
    longitude,
    address,
    radius,
    features,
  };

  try {
    if (latitude && longitude) {
      const { data } = await searchCompleteService.fetchLocations(latitude, longitude, radius, features);
      nearbyLocations = data.locations;
    }

    const featuresResult = await locationService.fetchAllFeatures();
    locationFeatures = featuresResult.data.features;
  } catch (error) {
    console.log(error);
  }

  return { nearbyLocations, locationFeatures, currentDestination, query };
};

export default withApolloClient(withGlobalData(Search));
