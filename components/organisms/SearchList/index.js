import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MapMarker } from 'static/images/icons/map_pin.svg';
import LocationItem from '../../molecules/LocationItem';

const List = styled.div`
  padding-top: 1.25rem;
  height: 100%;
  overflow-x: visible;
  overflow-y: scroll;
  position: relative;
  z-index: 2;
  background-color: #fff;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: auto;
    overflow-y: visible;
  }
`;

const Title = styled.div`
  display: flex;
  padding: 1.25rem;
`;

const IconWrapper = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  margin-top: 0.3125rem;
  margin-right: 1.25rem;
  flex: 0 0 auto;
`;

const SearchList = props => {
  const {
    fetchedLocations,
    currentDestination: { name, address },
  } = props;

  return (
    <List>
      <Title>
        <IconWrapper>
          <MapMarker />
        </IconWrapper>
        <div>
          <h4>
            {name}
            {address ? `, ${address}` : null}
          </h4>
          <p>
            {fetchedLocations ? fetchedLocations.length : 0} Parking
            {fetchedLocations && fetchedLocations.length > 1 ? ' Locations' : ' Location'} Available
          </p>
        </div>
      </Title>
      <div>
        {fetchedLocations
          ? fetchedLocations.map((item, i) => <LocationItem active={false} key={i} location={item} />)
          : null}
      </div>
    </List>
  );
};

export default SearchList;
