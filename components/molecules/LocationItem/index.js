import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link } from '../../../routes';

const Wrapper = styled.div`
  padding: 1.25rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: flex;
  }

  &:hover,
  &.active {
    background-color: #f3f3f3;
  }

  &:not(:first-child) {
    border-top: 0.0625rem #adadad solid;
  }
`;

const Info = styled.div`
  padding-left: 0;
  margin-bottom: 1.25rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding-left: 1.25rem;
    margin-bottom: 0;
  }
`;

const Title = styled.h5`
  display: inline-block;

  span {
    font-weight: normal;
    margin-right: 0.625rem;
  }
`;

const Position = styled.p`
  margin-top: 1.25rem;
`;


const LocationCard = props => {
  const { location, theme, active } = props;
  const { address, photo, distance, features } = location;
  const friendlyName = location.friendly_name;

  return (
    <Wrapper className={active && 'active'}>
      <Info>
        <Link passHref href={`/${friendlyName}`}>
          <a>
            <Title>
              {friendlyName}
              {address}
            </Title>
          </a>
        </Link>
        {distance ? <Position>{distance.toFixed(2)} mi walking distance</Position> : null}
      </Info>
    </Wrapper>
  );
};

export default withTheme(LocationCard);
