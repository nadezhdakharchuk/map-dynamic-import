import React from 'react';
import styled from 'styled-components';

const MarkerWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  text-align: center;
  margin: 0 auto;
`;

const Marker = styled.div`
  position: relative;
  display: inline-block;
  padding: 0.1875rem 0.5rem 0.125rem;
  white-space: nowrap;
  border-radius: 0.3125rem;
  background-color: ${({ colorTheme }) => colorTheme.content_color};
  color: ${({ colorTheme }) => colorTheme.text_color};
  font: 14px/1.4 'Gotham A', 'Gotham B', 'Gotham HTF', 'Gotham', Helvetica, sans-serif;
  cursor: pointer;

  div {
    border-color: ${({ colorTheme }) => colorTheme.content_color} transparent transparent;
  }
`;

const Status = styled.span`
  display: inline-block;
  width: 0.6875rem;
  height: 0.6875rem;
  margin-left: 0.3125rem;
  vertical-align: baseline;
  border-radius: 50%;
  background-color: ${({ overloaded }) => (overloaded ? '#fdd901' : '#3ba019')};
`;

const MarkerCorner = styled.div`
  position: absolute;
  bottom: -1.0625rem;
  left: 50%;
  display: block;
  margin-left: -0.625rem;
  border: solid 0.625rem;
`;

const MapMarker = props => {
  const { name, overloaded, colorTheme, competitor } = props;

  return (
    <MarkerWrapper>
      <Marker colorTheme={colorTheme}>
        {name}
        {competitor ? null : <Status overloaded={overloaded} />}
        <MarkerCorner />
      </Marker>
    </MarkerWrapper>
  );
};

export default MapMarker;
