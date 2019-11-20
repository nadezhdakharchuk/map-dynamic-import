import React from 'react';
import ApiService from 'services/ApiService';

export default App => {
  return class WithData extends React.Component {
    static async getInitialProps(ctx) {
      const {
        ctx: { req, res },
      } = ctx;

      ctx.ctx.apiService = new ApiService();

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        return {};
      }

      return {
        ...appProps,
      };
    }

    constructor(props) {
      super(props);
      this.apiService = new ApiService();
    }

    render() {
      return <App apiService={this.apiService} {...this.props} />;
    }
  };
};
