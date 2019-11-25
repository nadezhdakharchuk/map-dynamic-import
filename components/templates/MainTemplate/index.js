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
  margin-top: -5rem;
`;

const MainTemplate = ({ children, isHomePage, globalData, searchCompleteService }) => {
  return (
    <Wrapper>
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default MainTemplate;
