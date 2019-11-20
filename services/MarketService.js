import gql from 'graphql-tag';

export const apiUrl = '/v1/markets';

export default class MarketService {
  constructor(apiService, apolloClient) {
    this.apiService = apiService;
    this.apolloClient = apolloClient;
  }

  fetchMarkets() {
    return this.apolloClient
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
          {
            markets(archived: false, top_market: true) {
              id
              slug
              name
            }
          }
        `,
      })
      .then(({ data }) => {
        return { markets: data.markets };
      })
      .catch(error => {
        console.log('fetchMarkets markets from server ERROR', error);
        return { markets: [] };
      });
  }

  retrieveMarket(name) {
    return this.apiService.get(`${apiUrl}/${name}.json`);
  }
}
