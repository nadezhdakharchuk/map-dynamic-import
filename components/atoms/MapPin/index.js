import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PinIcon } from 'static/images/icons/map_pin.svg';

const Wrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`;

const MapPin = () => (
  <Wrapper>
    <PinIcon />
  </Wrapper>
);

export default MapPin;
