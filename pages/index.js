import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import queries from 'config/queries';

import withGlobalData from 'lib/withGlobalData';
import { withApolloClient } from 'lib/withApolloClient';
import SearchCompleteService from 'services/SearchCompleteService';
import MainTemplate from 'components/templates/MainTemplate';

const Home = ({ apiService }) => {
  const searchCompleteService = new SearchCompleteService(apiService);

  const globalData = useQuery(queries.GET_GLOBAL_DATA, {
    pollInterval: 60000,
  });

  return (
    <MainTemplate isHomePage globalData={globalData} searchCompleteService={searchCompleteService}>
    </MainTemplate>
  );
};

export default withApolloClient(withGlobalData(Home));
