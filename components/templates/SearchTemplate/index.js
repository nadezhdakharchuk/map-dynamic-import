import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;

  hr {
    width: 100%;
    margin: 0;
  }
`;

const SearchBody = styled.div`
  display: flex;
  height: calc(100vh - 10.375rem);

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-wrap: wrap;
    height: auto;
  }
`;

const SearchTemplate = ({ children, globalData }) => {
  return (
    <Wrapper>
      <Main>
        <SearchBody>{children}</SearchBody>
      </Main>
    </Wrapper>
  );
};

export default SearchTemplate;
