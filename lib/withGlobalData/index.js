import React, { Component } from 'react';

import queries from 'config/queries';

export default App => {
  return class WithGlobalData extends Component {
    static async getInitialProps(ctx) {
      let pageProps = {};

      if (App.getInitialProps) {
        pageProps = await App.getInitialProps(ctx);
      }

      const { loading, error, data } = await ctx.apolloClient
        .query({
          query: queries.GET_GLOBAL_DATA,
        })
        .then(({ data }) => {
          return { data: data };
        })
        .catch(error => {
          console.log('fetch GET_GLOBAL_DATA from server ERROR', error);
          return { data: {} };
        });

      pageProps.globalData = { loading, error, data };
      return { ...pageProps };
    }

    render() {
      return <App {...this.props} />;
    }
  };
};
